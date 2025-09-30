export interface CacheEntry {
  url: string;
  blobUrl: string;
  size: number;
  timestamp: number;
  accessCount: number;
  lastAccessed: number;
}

export interface CacheStats {
  totalSize: number;
  entryCount: number;
  hitRate: number;
  totalHits: number;
  totalMisses: number;
  maxSize: number;
}

export interface VideoMetadata {
  duration?: number;
  width?: number;
  height?: number;
  size: number;
}

export type CacheEvent = 'hit' | 'miss' | 'preload-start' | 'preload-complete' | 'preload-error' | 'eviction';

export interface CacheEventData {
  url: string;
  size?: number;
  error?: Error;
  progress?: number;
}

class VideoCache {
  private static instance: VideoCache;
  private cache = new Map<string, CacheEntry>();
  private pendingRequests = new Map<string, Promise<string>>();
  private maxSize: number;
  private totalHits = 0;
  private totalMisses = 0;
  private listeners = new Map<CacheEvent, Set<(data: CacheEventData) => void>>();

  private constructor(maxSizeInMB = 50) {
    this.maxSize = maxSizeInMB * 1024 * 1024; // Convert to bytes
    
    // Cleanup on page unload
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', () => this.clear());
    }
  }

  static getInstance(maxSizeInMB?: number): VideoCache {
    if (!VideoCache.instance) {
      VideoCache.instance = new VideoCache(maxSizeInMB);
    }
    return VideoCache.instance;
  }

  // Event system
  on(event: CacheEvent, callback: (data: CacheEventData) => void): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      this.listeners.get(event)?.delete(callback);
    };
  }

  private emit(event: CacheEvent, data: CacheEventData): void {
    this.listeners.get(event)?.forEach(callback => callback(data));
  }

  async preload(url: string, priority = 0): Promise<string> {
    // Check if already cached
    const cached = this.cache.get(url);
    if (cached) {
      this.updateAccessTime(url);
      this.totalHits++;
      this.emit('hit', { url, size: cached.size });
      return cached.blobUrl;
    }

    // Check if already being loaded
    const pending = this.pendingRequests.get(url);
    if (pending) {
      return pending;
    }

    this.totalMisses++;
    this.emit('miss', { url });
    this.emit('preload-start', { url });

    // Create loading promise
    const loadPromise = this.loadVideo(url);
    this.pendingRequests.set(url, loadPromise);

    try {
      const blobUrl = await loadPromise;
      this.emit('preload-complete', { url });
      return blobUrl;
    } catch (error) {
      this.emit('preload-error', { url, error: error as Error });
      throw error;
    } finally {
      this.pendingRequests.delete(url);
    }
  }

  private async loadVideo(url: string): Promise<string> {
    let retries = 0;
    const maxRetries = 3;
    
    while (retries < maxRetries) {
      try {
        // Detect connection speed for adaptive loading
        const connection = this.getConnectionInfo();
        const response = await this.fetchWithTimeout(url, connection.slowConnection ? 30000 : 10000);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch video: ${response.status}`);
        }

        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        
        // Store in cache
        await this.storeInCache(url, blobUrl, blob.size);
        
        return blobUrl;
      } catch (error) {
        retries++;
        if (retries >= maxRetries) {
          throw error;
        }
        
        // Exponential backoff
        const delay = Math.pow(2, retries) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    throw new Error('Max retries exceeded');
  }

  private async fetchWithTimeout(url: string, timeout: number): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    try {
      // Add cache-friendly headers to help with server-side caching
      const headers: HeadersInit = {
        'Cache-Control': 'public, max-age=31536000',
        'Accept': 'video/mp4,video/*;q=0.9,*/*;q=0.8',
        'Accept-Ranges': 'bytes'
      };

      const response = await fetch(url, { 
        signal: controller.signal,
        headers,
        cache: 'force-cache' // Prefer cached responses
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  private getConnectionInfo() {
    if (typeof navigator !== 'undefined' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      return {
        effectiveType: connection?.effectiveType || '4g',
        downlink: connection?.downlink || 10,
        slowConnection: connection?.effectiveType === 'slow-2g' || connection?.effectiveType === '2g'
      };
    }
    return { effectiveType: '4g', downlink: 10, slowConnection: false };
  }

  private async storeInCache(url: string, blobUrl: string, size: number): Promise<void> {
    // Ensure we have space
    await this.ensureSpace(size);
    
    const entry: CacheEntry = {
      url,
      blobUrl,
      size,
      timestamp: Date.now(),
      accessCount: 1,
      lastAccessed: Date.now()
    };
    
    this.cache.set(url, entry);
  }

  private async ensureSpace(requiredSize: number): Promise<void> {
    const currentSize = this.getCurrentCacheSize();
    
    if (currentSize + requiredSize <= this.maxSize) {
      return;
    }

    // Sort by LRU (least recently used first)
    const entries = Array.from(this.cache.entries()).sort((a, b) => {
      const scoreA = a[1].lastAccessed + (a[1].accessCount * 1000);
      const scoreB = b[1].lastAccessed + (b[1].accessCount * 1000);
      return scoreA - scoreB;
    });

    // Remove entries until we have enough space
    for (const [url, entry] of entries) {
      if (currentSize + requiredSize <= this.maxSize) {
        break;
      }
      
      URL.revokeObjectURL(entry.blobUrl);
      this.cache.delete(url);
      this.emit('eviction', { url, size: entry.size });
    }

    // Memory usage warning
    const newSize = this.getCurrentCacheSize();
    if (newSize > this.maxSize * 0.8) {
      // Silent warning - could be sent to analytics instead
    }
  }

  get(url: string): string | null {
    const entry = this.cache.get(url);
    if (entry) {
      this.updateAccessTime(url);
      this.totalHits++;
      this.emit('hit', { url, size: entry.size });
      return entry.blobUrl;
    }
    
    this.totalMisses++;
    this.emit('miss', { url });
    return null;
  }

  private updateAccessTime(url: string): void {
    const entry = this.cache.get(url);
    if (entry) {
      entry.lastAccessed = Date.now();
      entry.accessCount++;
    }
  }

  clear(): void {
    // Revoke all blob URLs to free memory
    for (const entry of this.cache.values()) {
      URL.revokeObjectURL(entry.blobUrl);
    }
    
    this.cache.clear();
    this.pendingRequests.clear();
  }

  getStats(): CacheStats {
    const totalSize = this.getCurrentCacheSize();
    const totalRequests = this.totalHits + this.totalMisses;
    
    return {
      totalSize,
      entryCount: this.cache.size,
      hitRate: totalRequests > 0 ? this.totalHits / totalRequests : 0,
      totalHits: this.totalHits,
      totalMisses: this.totalMisses,
      maxSize: this.maxSize
    };
  }

  private getCurrentCacheSize(): number {
    return Array.from(this.cache.values()).reduce((total, entry) => total + entry.size, 0);
  }

  // Utility method to get video metadata
  async getVideoMetadata(url: string): Promise<VideoMetadata> {
    return new Promise((resolve, reject) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        resolve({
          duration: video.duration,
          width: video.videoWidth,
          height: video.videoHeight,
          size: 0 // Will be updated when video is actually loaded
        });
      };
      
      video.onerror = () => {
        reject(new Error('Failed to load video metadata'));
      };
      
      video.src = url;
    });
  }

  // Warmup cache with multiple videos
  async warmup(urls: string[], maxConcurrent = 3): Promise<void> {
    const chunks = [];
    for (let i = 0; i < urls.length; i += maxConcurrent) {
      chunks.push(urls.slice(i, i + maxConcurrent));
    }

    for (const chunk of chunks) {
      await Promise.allSettled(
        chunk.map(url => this.preload(url))
      );
    }
  }
}

export default VideoCache;