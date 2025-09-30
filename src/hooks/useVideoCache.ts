import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import VideoCache, { CacheEventData } from '../utils/VideoCache';

export interface UseVideoCacheOptions {
  autoPreload?: boolean;
  priority?: number;
  maxRetries?: number;
  onLoad?: (url: string) => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

export interface UseVideoCacheReturn {
  videoUrl: string | null;
  isLoading: boolean;
  error: Error | null;
  progress: number;
  preload: () => Promise<void>;
  clearCache: () => void;
  retry: () => Promise<void>;
  isFromCache: boolean;
}

export const useVideoCache = (
  src: string,
  options: UseVideoCacheOptions = {}
): UseVideoCacheReturn => {
  const {
    autoPreload = false,
    priority = 0,
    onLoad,
    onError,
    onProgress
  } = options;

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [progress, setProgress] = useState(0);
  const [isFromCache, setIsFromCache] = useState(false);
  
  const cache = useRef(VideoCache.getInstance());
  const isMountedRef = useRef(true);
  const retryCountRef = useRef(0);

  // Check if already cached
  useEffect(() => {
    if (!src) return;

    const cachedUrl = cache.current.get(src);
    if (cachedUrl) {
      setVideoUrl(cachedUrl);
      setIsFromCache(true);
      onLoad?.(cachedUrl);
    } else if (autoPreload) {
      preloadVideo();
    }

    return () => {
      isMountedRef.current = false;
    };
  }, [src, autoPreload]);

  // Set cache event listeners
  useEffect(() => {
    if (!src) return;

    const unsubscribers: (() => void)[] = [];

    // Listen for preload events for this URL
    unsubscribers.push(
      cache.current.on('preload-start', (data: CacheEventData) => {
        if (data.url === src && isMountedRef.current) {
          setIsLoading(true);
          setError(null);
          setProgress(0);
        }
      })
    );

    unsubscribers.push(
      cache.current.on('preload-complete', (data: CacheEventData) => {
        if (data.url === src && isMountedRef.current) {
          setIsLoading(false);
          setProgress(100);
          const cachedUrl = cache.current.get(src);
          if (cachedUrl) {
            setVideoUrl(cachedUrl);
            setIsFromCache(true);
            onLoad?.(cachedUrl);
          }
        }
      })
    );

    unsubscribers.push(
      cache.current.on('preload-error', (data: CacheEventData) => {
        if (data.url === src && isMountedRef.current) {
          setIsLoading(false);
          setError(data.error || new Error('Failed to load video'));
          onError?.(data.error || new Error('Failed to load video'));
        }
      })
    );

    unsubscribers.push(
      cache.current.on('hit', (data: CacheEventData) => {
        if (data.url === src && isMountedRef.current) {
          setIsFromCache(true);
        }
      })
    );

    return () => {
      unsubscribers.forEach(unsub => unsub());
    };
  }, [src, onLoad, onError]);

  const preloadVideo = useCallback(async () => {
    if (!src || isLoading) return;

    try {
      setIsLoading(true);
      setError(null);
      setProgress(0);
      retryCountRef.current = 0;

      const blobUrl = await cache.current.preload(src, priority);
      
      if (isMountedRef.current) {
        setVideoUrl(blobUrl);
        setIsFromCache(true);
        setIsLoading(false);
        setProgress(100);
        onLoad?.(blobUrl);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err as Error;
        setError(error);
        setIsLoading(false);
        onError?.(error);
      }
    }
  }, [src, priority, isLoading, onLoad, onError]);

  const retry = useCallback(async () => {
    retryCountRef.current++;
    await preloadVideo();
  }, [preloadVideo]);

  const clearCacheForVideo = useCallback(() => {
    if (videoUrl) {
      // Note: We don't clear the entire cache, just remove this video
      // The VideoCache class doesn't expose a method to remove individual entries
      // Todo: Baadme Enhance it :)
      cache.current.clear();
      setVideoUrl(null);
      setIsFromCache(false);
    }
  }, [videoUrl]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return {
    videoUrl,
    isLoading,
    error,
    progress,
    preload: preloadVideo,
    clearCache: clearCacheForVideo,
    retry,
    isFromCache
  };
};

// Hook for preloading multiple videos
export const useMultiVideoCache = (
  urls: string[],
  options: { maxConcurrent?: number; priority?: number } = {}
) => {
  const { maxConcurrent = 3, priority = 0 } = options;
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, Error>>({});
  const [progress, setProgress] = useState<Record<string, number>>({});
  
  const cache = useRef(VideoCache.getInstance());
  
  // Stabilize the URLs array to prevent infinite re-renders
  const stableUrls = useMemo(() => urls, [JSON.stringify(urls)]);
  const stableOptions = useMemo(() => ({ maxConcurrent, priority }), [maxConcurrent, priority]);

  const preloadAll = useCallback(async () => {
    const chunks = [];
    for (let i = 0; i < stableUrls.length; i += stableOptions.maxConcurrent) {
      chunks.push(stableUrls.slice(i, i + stableOptions.maxConcurrent));
    }

    for (const chunk of chunks) {
      await Promise.allSettled(
        chunk.map(async (url) => {
          try {
            setLoadingStates(prev => ({ ...prev, [url]: true }));
            await cache.current.preload(url, stableOptions.priority);
            setLoadingStates(prev => ({ ...prev, [url]: false }));
            setProgress(prev => ({ ...prev, [url]: 100 }));
          } catch (error) {
            setLoadingStates(prev => ({ ...prev, [url]: false }));
            setErrors(prev => ({ ...prev, [url]: error as Error }));
          }
        })
      );
    }
  }, [stableUrls, stableOptions]);

  return {
    preloadAll,
    loadingStates,
    errors,
    progress
  };
};

export default useVideoCache;