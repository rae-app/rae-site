import React, { forwardRef, useEffect, useRef, useState } from 'react';
import { useVideoCache } from '../hooks/useVideoCache';

export interface CachedVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string;
  placeholder?: React.ReactNode;
  errorComponent?: React.ReactNode;
  showLoadingProgress?: boolean;
  lazyLoad?: boolean;
  preloadPriority?: number;
  onCacheLoad?: (url: string) => void;
  onCacheError?: (error: Error) => void;
  fallbackToOriginal?: boolean;
  className?: string;
  loadingClassName?: string;
  errorClassName?: string;
}

const DefaultPlaceholder: React.FC<{ progress?: number; showProgress?: boolean }> = ({ 
  progress = 0, 
  showProgress = false 
}) => (
  <div className="w-full h-full bg-zinc-800 animate-pulse flex flex-col items-center justify-center">
    <div className="text-zinc-400 text-sm mb-2">Loading video...</div>
    {showProgress && (
      <div className="w-3/4 bg-zinc-700 rounded-full h-1">
        <div 
          className="bg-accent h-1 rounded-full transition-all duration-300" 
          style={{ width: `${progress}%` }}
        />
      </div>
    )}
  </div>
);

const DefaultErrorComponent: React.FC<{ onRetry?: () => void }> = ({ onRetry }) => (
  <div className="w-full h-full bg-zinc-900 flex flex-col items-center justify-center text-zinc-400">
    <div className="text-sm mb-2">Failed to load video</div>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="text-xs bg-zinc-700 hover:bg-zinc-600 px-2 py-1 rounded transition-colors"
      >
        Retry
      </button>
    )}
  </div>
);

const CachedVideo = forwardRef<HTMLVideoElement, CachedVideoProps>(({
  src,
  placeholder,
  errorComponent,
  showLoadingProgress = false,
  lazyLoad = false,
  preloadPriority = 0,
  onCacheLoad,
  onCacheError,
  fallbackToOriginal = true,
  className = '',
  loadingClassName = '',
  errorClassName = '',
  onLoad,
  onError,
  ...videoProps
}, ref) => {
  const [isInView, setIsInView] = useState(!lazyLoad);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazyLoad || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [lazyLoad, isInView]);

  // Use video cache hook
  const {
    videoUrl,
    isLoading,
    error,
    progress,
    preload,
    retry
  } = useVideoCache(src, {
    autoPreload: isInView && !hasAttemptedLoad,
    priority: preloadPriority,
    onLoad: (url) => {
      setHasAttemptedLoad(true);
      onCacheLoad?.(url);
    },
    onError: (err) => {
      setHasAttemptedLoad(true);
      onCacheError?.(err);
    }
  });

  // Manual preload trigger for lazy loading
  useEffect(() => {
    if (isInView && !hasAttemptedLoad && !isLoading && !videoUrl) {
      preload();
    }
  }, [isInView, hasAttemptedLoad, isLoading, videoUrl, preload]);

  // Forward ref
  useEffect(() => {
    if (ref) {
      if (typeof ref === 'function') {
        ref(videoRef.current);
      } else {
        ref.current = videoRef.current;
      }
    }
  }, [ref]);

  const handleVideoLoad = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    onLoad?.(event);
  };

  const handleVideoError = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    onError?.(event);
  };

  const handleRetry = () => {
    retry();
  };

  // Render states
  if (!isInView) {
    return (
      <div ref={containerRef} className={`${className} ${loadingClassName}`}>
        {placeholder || <DefaultPlaceholder />}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div ref={containerRef} className={`${className} ${loadingClassName}`}>
        {placeholder || (
          <DefaultPlaceholder 
            progress={progress} 
            showProgress={showLoadingProgress} 
          />
        )}
      </div>
    );
  }

  if (error) {
    // Fallback to original URL if cache failed and fallback is enabled
    if (fallbackToOriginal) {
      return (
        <div ref={containerRef} className={className}>
          <video
            ref={videoRef}
            src={src}
            onLoad={handleVideoLoad}
            onError={handleVideoError}
            className="w-full h-full"
            {...videoProps}
          />
        </div>
      );
    }

    return (
      <div ref={containerRef} className={`${className} ${errorClassName}`}>
        {errorComponent || <DefaultErrorComponent onRetry={handleRetry} />}
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div ref={containerRef} className={`${className} ${loadingClassName}`}>
        {placeholder || <DefaultPlaceholder />}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={videoUrl}
        onLoad={handleVideoLoad}
        onError={handleVideoError}
        className="w-full h-full"
        {...videoProps}
      />
    </div>
  );
});

CachedVideo.displayName = 'CachedVideo';

export default CachedVideo;