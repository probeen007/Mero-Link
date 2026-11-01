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

  // Spotify SVG Logo Component
  const SpotifyBrandLogo = ({ className = "w-16 h-16" }) => (
    <svg className={`${className} text-[#1DB954]`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.47-.747 3.856-.88 7.15-.509 9.816 1.127.295.18.387.563.208.865zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.185-.413.125-.845-.108-.97-.522-.125-.413.109-.844.522-.97 3.663-1.112 8.233-.57 11.337 1.34.367.227.487.708.26 1.076zm.106-2.834C14.692 8.79 9.356 8.614 6.274 9.549c-.5.152-1.023-.133-1.175-.633-.153-.5.133-1.023.633-1.175 3.545-1.077 9.428-.874 13.155 1.339.45.267.6.845.333 1.295-.268.452-.846.6-1.296.333z"/>
    </svg>
  );

  // TikTok SVG Logo Component
  const TikTokBrandLogo = ({ className = "w-16 h-16" }) => (
    <svg className={`${className} text-white`} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.63 4.14.99 1.1 2.37 1.79 3.86 1.98v3.83c-1.78-.05-3.52-.69-4.88-1.84-.19-.16-.3-.12-.3.15-.02 2.47-.02 4.93-.03 7.4-.07 1.86-.68 3.69-1.82 5.11-1.39 1.76-3.56 2.87-5.83 3.06-2.16.18-4.38-.34-6.17-1.57C1.1 21.05-.03 18.66.01 16.14c-.04-2.42.98-4.8 2.8-6.39 1.72-1.51 4.07-2.22 6.34-1.93V11.8c-1.19-.34-2.5-.16-3.53.48-.96.6-1.69 1.6-1.83 2.72-.19 1.54.49 3.12 1.77 3.98 1.14.77 2.62.88 3.86.29 1.09-.52 1.83-1.59 1.95-2.79.05-3.86.03-7.72.04-11.59-.01-.15.06-.2.2-.2 1.28.02 2.56.02 3.84.02.03-.68.1-1.36.08-2.09z"/>
    </svg>
  );

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
              ) : selectedVideo.platform === 'spotify' ? (
                <div className="w-full h-full bg-gradient-to-br from-[#121212] to-[#1ed760]/10 flex flex-col items-center justify-center gap-3">
                  <SpotifyBrandLogo />
                  <span className="text-[#1ed760] text-xs font-semibold uppercase tracking-wider">Spotify Music</span>
                </div>
              ) : selectedVideo.platform === 'tiktok' ? (
                <div className="w-full h-full bg-gradient-to-br from-[#010101] to-[#fe2c55]/20 flex flex-col items-center justify-center gap-3">
                  <TikTokBrandLogo />
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">TikTok Video</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400">Media Preview</div>
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
        <p className="mt-3 max-w-[480px] mx-auto text-center text-sm font-medium text-gray-750 truncate px-2">
          {selectedVideo.title || 'Media Player'}
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
                ) : video.platform === 'spotify' ? (
                  <div className="w-full h-full bg-[#121212] flex items-center justify-center">
                    <SpotifyBrandLogo className="w-8 h-8" />
                  </div>
                ) : video.platform === 'tiktok' ? (
                  <div className="w-full h-full bg-[#010101] flex items-center justify-center">
                    <TikTokBrandLogo className="w-8 h-8" />
                  </div>
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
              
              <p className="mt-2 text-xs font-medium text-gray-750 line-clamp-2">
                {video.title || 'Media Player'}
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
              ) : selectedVideo.platform === 'spotify' ? (
                <div className="w-full h-full bg-gradient-to-br from-[#121212] to-[#1ed760]/10 flex flex-col items-center justify-center gap-3">
                  <SpotifyBrandLogo />
                  <span className="text-[#1ed760] text-xs font-semibold uppercase tracking-wider">Spotify Music</span>
                </div>
              ) : selectedVideo.platform === 'tiktok' ? (
                <div className="w-full h-full bg-gradient-to-br from-[#010101] to-[#fe2c55]/20 flex flex-col items-center justify-center gap-3">
                  <TikTokBrandLogo />
                  <span className="text-white text-xs font-semibold uppercase tracking-wider">TikTok Video</span>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-gray-400">Media Preview</div>
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
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              allowFullScreen
            />
          )}
        </div>
      )}

      <p className="mt-3 max-w-[480px] mx-auto text-center text-sm font-medium text-gray-750 truncate px-2">
        {selectedVideo?.title || 'Media Player'}
      </p>
    </div>
  );
}
