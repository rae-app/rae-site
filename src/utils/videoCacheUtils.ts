// Re-export all video cache related types and utilities for easier imports
export { default as VideoCache } from './VideoCache';
export type {
  CacheEntry,
  CacheStats,
  VideoMetadata,
  CacheEvent,
  CacheEventData
} from './VideoCache';

export { default as useVideoCache, useMultiVideoCache } from '../hooks/useVideoCache';
export type {
  UseVideoCacheOptions,
  UseVideoCacheReturn
} from '../hooks/useVideoCache';

export { default as CachedVideo } from '../components/CachedVideo';
export type { CachedVideoProps } from '../components/CachedVideo';

export { 
  default as VideoCacheProvider, 
  useVideoCacheContext
} from '../components/VideoCacheProvider';
export type { VideoCacheProviderProps } from '../components/VideoCacheProvider';

import VideoCacheClass from './VideoCache';

// Utility function to get cache instance
export const getVideoCacheInstance = () => VideoCacheClass.getInstance();

// Utility function to preload videos with custom options
export const preloadVideos = async (urls: string[], options?: {
  maxConcurrent?: number;
  priority?: number;
}) => {
  const cache = VideoCacheClass.getInstance();
  const { maxConcurrent = 3, priority = 0 } = options || {};
  
  const chunks = [];
  for (let i = 0; i < urls.length; i += maxConcurrent) {
    chunks.push(urls.slice(i, i + maxConcurrent));
  }

  for (const chunk of chunks) {
    await Promise.allSettled(
      chunk.map(url => cache.preload(url, priority))
    );
  }
};

// Utility to clear cache and free memory
export const clearVideoCache = () => {
  const cache = VideoCacheClass.getInstance();
  cache.clear();
};

// Utility to get cache statistics
export const getVideoCacheStats = () => {
  const cache = VideoCacheClass.getInstance();
  return cache.getStats();
};