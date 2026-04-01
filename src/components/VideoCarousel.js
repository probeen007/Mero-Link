'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { faPlay, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function VideoCarousel({ videos = [] }) {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const validVideos = videos && Array.isArray(videos) ? videos.filter(v => v && v.url) : [];

  const isSingleVideo = validVideos.length === 1;

  // Check scroll position for carousel navigation
  const checkScroll = useCallback(() => {
    if (carouselRef.current && !isSingleVideo) {
      setCanScrollLeft(carouselRef.current.scrollLeft > 0);
      setCanScrollRight(
        carouselRef.current.scrollLeft < 
        carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
      );
    }
  }, [isSingleVideo]);

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [checkScroll]);

  if (validVideos.length === 0) return null;

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = 400;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScroll, 300);
    }
  };

  const selectedVideo = validVideos[selectedVideoIndex];

  // Single video view (large)
  if (isSingleVideo) {
    return (
      <div className="w-full mb-5">
        <div className="relative w-full max-w-[480px] mx-auto aspect-[16/10] bg-black rounded-lg overflow-hidden group">
          {!showVideo ? (
            <>
              {selectedVideo.thumbnail ? (
                <Image
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover object-center"
                  unoptimized={true}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400">Video Unavailable</div>
                </div>
              )}
              
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-14 group-hover:h-14 transition-all duration-300 shadow-lg">
                  <FontAwesomeIcon icon={faPlay} className="text-purple-600 ml-1 text-base" />
                </div>
              </button>
            </>
          ) : (
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
        <p className="mt-3 max-w-[480px] mx-auto text-center text-sm font-medium text-gray-700 truncate px-2">
          {selectedVideo.title || 'Video'}
        </p>
      </div>
    );
  }

  // Multiple videos carousel view
  return (
    <div className="w-full mb-6">
      <div className="relative group">
        {/* Left scroll button */}
        {canScrollLeft && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all shadow-lg"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
          </button>
        )}

        {/* Carousel */}
        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto scroll-smooth pb-2 px-2"
          style={{ scrollBehavior: 'smooth' }}
          onScroll={checkScroll}
        >
          {validVideos.map((video, idx) => (
            <div
              key={video.id || idx}
              className="flex-shrink-0 w-28 sm:w-32 md:w-36 cursor-pointer group/card transition-transform hover:scale-105"
              onClick={() => {
                setSelectedVideoIndex(idx);
                setShowVideo(false);
              }}
            >
              <div className="relative aspect-[16/10] bg-black rounded-lg overflow-hidden">
                {video.thumbnail ? (
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover object-center group-hover/card:opacity-75 transition-opacity"
                    unoptimized={true}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900" />
                )}
                
                <div className="absolute inset-0 bg-black/20 group-hover/card:bg-black/10 transition-all flex items-center justify-center">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center group-hover/card:bg-white transition-all shadow-lg">
                    <FontAwesomeIcon icon={faPlay} className="text-purple-600 ml-0.5 text-xs" />
                  </div>
                </div>
                
                {selectedVideoIndex === idx && (
                  <div className="absolute inset-0 border-2 border-purple-500 rounded-lg" />
                )}
              </div>
              
              <p className="mt-2 text-xs font-medium text-gray-700 line-clamp-2">
                {video.title || 'Video'}
              </p>
            </div>
          ))}
        </div>

        {/* Right scroll button */}
        {canScrollRight && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-all shadow-lg"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Selected video display */}
      {selectedVideo && (
        <div className="mt-4 relative w-full max-w-[480px] mx-auto aspect-[16/10] bg-black rounded-lg overflow-hidden group">
          {!showVideo ? (
            <>
              {selectedVideo.thumbnail ? (
                <Image
                  src={selectedVideo.thumbnail}
                  alt={selectedVideo.title}
                  fill
                  className="object-cover object-center"
                  unoptimized={true}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400">Video Unavailable</div>
                </div>
              )}
              
              <button
                onClick={() => setShowVideo(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-all"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white group-hover:w-16 group-hover:h-16 transition-all shadow-lg">
                  <FontAwesomeIcon icon={faPlay} className="text-purple-600 ml-1 text-base sm:text-lg" />
                </div>
              </button>
            </>
          ) : (
            <iframe
              src={selectedVideo.url}
              title={selectedVideo.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>
      )}

      <p className="mt-3 max-w-[480px] mx-auto text-center text-sm font-medium text-gray-700 truncate px-2">
        {selectedVideo?.title || 'Video'}
      </p>
    </div>
  );
}
