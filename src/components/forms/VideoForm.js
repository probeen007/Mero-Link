'use client';

import { useState } from 'react';
import Image from 'next/image';
import { faTrash, faGripVertical, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '@/components/buttons/SubmitButton';
import SectionBox from '@/components/layout/SectionBox';
import toast from 'react-hot-toast';
import { extractVideoInfo, isValidVideoUrl, getThumbnailUrl } from '@/libs/videoExtractor';

export default function VideoForm({ page, uri, onSuccess }) {
  const [videos, setVideos] = useState(page?.videos || []);
  const [videoPosition, setVideoPosition] = useState(page?.videoPosition === 'after' ? 'after' : 'before');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddVideo = async () => {
    if (!newVideoUrl.trim()) {
      toast.error('Please enter a media URL');
      return;
    }

    if (!isValidVideoUrl(newVideoUrl)) {
      toast.error('Please enter a valid YouTube, Vimeo, Spotify, or TikTok link');
      return;
    }

    const videoInfo = extractVideoInfo(newVideoUrl);
    if (!videoInfo) {
      toast.error('Invalid media URL');
      return;
    }

    // Check if media already exists
    if (videos.some(v => v.videoId === videoInfo.videoId)) {
      toast.error('This media link is already added');
      return;
    }

    // Max 10 items
    if (videos.length >= 10) {
      toast.error('Maximum 10 media elements allowed');
      return;
    }

    setLoading(true);
    let resolvedThumbnail = '';
    try {
      resolvedThumbnail = await getThumbnailUrl(videoInfo);
    } catch (e) {
      console.error('Error fetching media thumbnail:', e);
    } finally {
      setLoading(false);
    }

    const newVideo = {
      id: `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: videoTitle || videoInfo.title,
      url: videoInfo.embedUrl,
      thumbnail: resolvedThumbnail || videoInfo.thumbnail,
      platform: videoInfo.platform,
      videoId: videoInfo.videoId,
      order: videos.length
    };

    setVideos([...videos, newVideo]);
    setNewVideoUrl('');
    setVideoTitle('');
    toast.success('Media element added!');
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
    toast.success('Media element removed');
  };

  const handleDragStart = (index) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (index) => {
    if (draggedIndex === null || draggedIndex === index) return;

    const newVideos = [...videos];
    const draggedVideo = newVideos[draggedIndex];
    newVideos.splice(draggedIndex, 1);
    newVideos.splice(index, 0, draggedVideo);

    // Update order
    newVideos.forEach((v, i) => (v.order = i));
    setVideos(newVideos);
    setDraggedIndex(null);
  };

  const handleSaveVideos = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/saveVideos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uri, videos, videoPosition })
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'Failed to save media elements');
        return;
      }

      toast.success(`${data.videoCount} media element(s) saved successfully!`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving media:', error);
      toast.error('Failed to save media elements');
    } finally {
      setLoading(false);
    }
  };

  const handlePositionChange = (nextPosition) => {
    setVideoPosition(nextPosition);
  };

  return (
    <SectionBox>
      <div className="space-y-6">
        {/* Add Video Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faPlay} className="text-purple-600" />
            Add Video & Music Embeds
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Media Section Position (applies to all elements)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Choose where the media section should appear relative to normal links.
            </p>
            <select
              value={videoPosition}
              onChange={(e) => handlePositionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="before">Media section before normal links</option>
              <option value="after">Media section after normal links</option>
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media URL (YouTube, Vimeo, Spotify, TikTok, or direct MP4 link)
              </label>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddVideo()}
                placeholder="https://youtube.com/watch?v=... OR https://open.spotify.com/track/... OR https://tiktok.com/@user/video/..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste the full share link. Players load instantly on your page.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Media Title (Optional)
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddVideo()}
                placeholder="My Playlist / Song / Video"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <button
              onClick={handleAddVideo}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Media Link
            </button>
          </div>
        </div>

        {/* Videos List */}
        {videos.length > 0 ? (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Media Elements ({videos.length}/10)
            </h3>
            <div className="space-y-2 bg-gray-50 p-3 rounded-lg">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={handleDragOver}
                  onDrop={() => handleDrop(index)}
                  className={`flex items-center gap-3 p-3 bg-white border rounded-lg transition-all ${
                    draggedIndex === index ? 'opacity-50 border-purple-500' : 'border-gray-200'
                  } hover:border-gray-300 cursor-move group`}
                >
                  {/* Drag handle */}
                  <FontAwesomeIcon
                    icon={faGripVertical}
                    className="text-gray-400 group-hover:text-gray-600 flex-shrink-0"
                  />

                  {/* Thumbnail */}
                  <div className="w-12 h-12 bg-black rounded flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    {video.thumbnail ? (
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="48px"
                        unoptimized={true}
                        className="object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ) : video.platform === 'spotify' ? (
                      <svg className="w-6 h-6 text-[#1DB954]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.892-.982-.336.076-.67-.135-.746-.47-.077-.337.135-.67.47-.747 3.856-.88 7.15-.509 9.816 1.127.295.18.387.563.208.865zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.075-1.185-.413.125-.845-.108-.97-.522-.125-.413.109-.844.522-.97 3.663-1.112 8.233-.57 11.337 1.34.367.227.487.708.26 1.076zm.106-2.834C14.692 8.79 9.356 8.614 6.274 9.549c-.5.152-1.023-.133-1.175-.633-.153-.5.133-1.023.633-1.175 3.545-1.077 9.428-.874 13.155 1.339.45.267.6.845.333 1.295-.268.452-.846.6-1.296.333z"/>
                      </svg>
                    ) : video.platform === 'tiktok' ? (
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.03 1.63 4.14.99 1.1 2.37 1.79 3.86 1.98v3.83c-1.78-.05-3.52-.69-4.88-1.84-.19-.16-.3-.12-.3.15-.02 2.47-.02 4.93-.03 7.4-.07 1.86-.68 3.69-1.82 5.11-1.39 1.76-3.56 2.87-5.83 3.06-2.16.18-4.38-.34-6.17-1.57C1.1 21.05-.03 18.66.01 16.14c-.04-2.42.98-4.8 2.8-6.39 1.72-1.51 4.07-2.22 6.34-1.93V11.8c-1.19-.34-2.5-.16-3.53.48-.96.6-1.69 1.6-1.83 2.72-.19 1.54.49 3.12 1.77 3.98 1.14.77 2.62.88 3.86.29 1.09-.52 1.83-1.59 1.95-2.79.05-3.86.03-7.72.04-11.59-.01-.15.06-.2.2-.2 1.28.02 2.56.02 3.84.02.03-.68.1-1.36.08-2.09z"/>
                      </svg>
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-xs" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {video.title || 'Untitled Media'}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {video.platform === 'youtube' && (
                        <>
                          <FontAwesomeIcon icon={faYoutube} className="text-red-600" />
                          YouTube
                        </>
                      )}
                      {video.platform === 'vimeo' && 'Vimeo'}
                      {video.platform === 'spotify' && 'Spotify'}
                      {video.platform === 'tiktok' && 'TikTok'}
                      {video.platform === 'other' && 'Media'}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveVideo(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                    title="Remove media element"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📌 Drag items to reorder. Single item displays large, 2+ items show in carousel.
            </p>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No media elements yet. Add one above to get started!
          </div>
        )}

        {/* Save Button */}
        {videos.length > 0 && (
          <SubmitButton
            onClick={handleSaveVideos}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Saving Media...' : 'Save Media'}
          </SubmitButton>
        )}
      </div>
    </SectionBox>
  );
}
