"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import VideoCache, { CacheStats } from '../utils/VideoCache';

interface VideoCacheContextType {
  cache: VideoCache;
  stats: CacheStats;
  warmupVideos: (urls: string[]) => Promise<void>;
  clearCache: () => void;
  isWarmedUp: boolean;
}

const VideoCacheContext = createContext<VideoCacheContextType | null>(null);

export interface VideoCacheProviderProps {
  children: React.ReactNode;
  maxCacheSize?: number; // in MB
  warmupUrls?: string[];
  enableDebugLogs?: boolean;
  maxConcurrentLoads?: number;
}

export const VideoCacheProvider: React.FC<VideoCacheProviderProps> = ({
  children,
  maxCacheSize = 50,
  warmupUrls = [],
  enableDebugLogs = false,
  maxConcurrentLoads = 3
}) => {
  const [cache] = useState(() => VideoCache.getInstance(maxCacheSize));
  const [stats, setStats] = useState<CacheStats>(cache.getStats());
  const [isWarmedUp, setIsWarmedUp] = useState(false);

  // Stabilize warmupUrls to prevent infinite re-renders
  const stableWarmupUrls = useMemo(() => warmupUrls, [JSON.stringify(warmupUrls)]);

  // Update stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(cache.getStats());
    }, 5000);

    return () => clearInterval(interval);
  }, [cache]);

  // Warmup cache on mount
  useEffect(() => {
    if (stableWarmupUrls.length > 0) {
      warmupVideos(stableWarmupUrls);
    }
  }, [stableWarmupUrls]);

  const warmupVideos = async (urls: string[]) => {
    try {
      await cache.warmup(urls, maxConcurrentLoads);
      setIsWarmedUp(true);
    } catch (error) {
      // Mere code mei error nhi aata 🤓, that said error handling add krdena koi 😭
    }
  };

  const clearCache = () => {
    cache.clear();
    setStats(cache.getStats());
    setIsWarmedUp(false);
  };

  const value: VideoCacheContextType = {
    cache,
    stats,
    warmupVideos,
    clearCache,
    isWarmedUp
  };

  return (
    <VideoCacheContext.Provider value={value}>
      {children}
    </VideoCacheContext.Provider>
  );
};

export const useVideoCacheContext = (): VideoCacheContextType => {
  const context = useContext(VideoCacheContext);
  if (!context) {
    throw new Error('useVideoCacheContext must be used within a VideoCacheProvider');
  }
  return context;
};

export default VideoCacheProvider;