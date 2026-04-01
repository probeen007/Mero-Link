'use client';

import { useState } from 'react';
import Image from 'next/image';
import { faTrash, faGripVertical, faPlay, faPlus } from '@fortawesome/free-solid-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SubmitButton from '@/components/buttons/SubmitButton';
import SectionBox from '@/components/layout/SectionBox';
import toast from 'react-hot-toast';
import { extractVideoInfo, isValidVideoUrl } from '@/libs/videoExtractor';

export default function VideoForm({ page, uri, onSuccess }) {
  const [videos, setVideos] = useState(page?.videos || []);
  const [videoPosition, setVideoPosition] = useState(page?.videoPosition === 'after' ? 'after' : 'before');
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState(null);

  const handleAddVideo = async () => {
    if (!newVideoUrl.trim()) {
      toast.error('Please enter a video URL');
      return;
    }

    if (!isValidVideoUrl(newVideoUrl)) {
      toast.error('Please enter a valid YouTube or Vimeo link');
      return;
    }

    const videoInfo = extractVideoInfo(newVideoUrl);
    if (!videoInfo) {
      toast.error('Invalid video URL');
      return;
    }

    // Check if video already exists
    if (videos.some(v => v.videoId === videoInfo.videoId)) {
      toast.error('This video is already added');
      return;
    }

    // Max 10 videos
    if (videos.length >= 10) {
      toast.error('Maximum 10 videos allowed');
      return;
    }

    const newVideo = {
      id: `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      title: videoTitle || videoInfo.title,
      url: videoInfo.embedUrl,
      thumbnail: videoInfo.thumbnail,
      platform: videoInfo.platform,
      videoId: videoInfo.videoId,
      order: videos.length
    };

    setVideos([...videos, newVideo]);
    setNewVideoUrl('');
    setVideoTitle('');
    toast.success('Video added!');
  };

  const handleRemoveVideo = (index) => {
    setVideos(videos.filter((_, i) => i !== index));
    toast.success('Video removed');
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
        toast.error(data.error || 'Failed to save videos');
        return;
      }

      toast.success(`${data.videoCount} video(s) saved successfully!`);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving videos:', error);
      toast.error('Failed to save videos');
    } finally {
      setLoading(false);
    }
  };

  const handlePositionChange = async (nextPosition) => {
    setVideoPosition(nextPosition);

    try {
      const response = await fetch('/api/saveVideos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uri, videos, videoPosition: nextPosition })
      });

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.error || 'Failed to update position');
        return;
      }

      toast.success('Video section position updated');
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error updating video position:', error);
      toast.error('Failed to update position');
    }
  };

  return (
    <SectionBox>
      <div className="space-y-6">
        {/* Add Video Section */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FontAwesomeIcon icon={faPlay} className="text-purple-600" />
            Add Videos
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Video Section Position (applies to all videos)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Choose where the full video section should appear relative to normal links.
            </p>
            <select
              value={videoPosition}
              onChange={(e) => handlePositionChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            >
              <option value="before">Video section before normal links</option>
              <option value="after">Video section after normal links</option>
            </select>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (YouTube, Vimeo, or MP4 link)
              </label>
              <input
                type="text"
                value={newVideoUrl}
                onChange={(e) => setNewVideoUrl(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddVideo()}
                placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
              <p className="text-xs text-gray-500 mt-1">
                Paste the full video link. Thumbnails load automatically.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video Title (Optional)
              </label>
              <input
                type="text"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddVideo()}
                placeholder="My Awesome Video"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              />
            </div>

            <button
              onClick={handleAddVideo}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Video
            </button>
          </div>
        </div>

        {/* Videos List */}
        {videos.length > 0 ? (
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">
              Videos ({videos.length}/10)
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
                  <div className="w-12 h-12 bg-black rounded flex-shrink-0 relative overflow-hidden">
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
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center">
                        <FontAwesomeIcon icon={faPlay} className="text-white text-xs" />
                      </div>
                    )}
                  </div>

                  {/* Video Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">
                      {video.title || 'Untitled Video'}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      {video.platform === 'youtube' && (
                        <>
                          <FontAwesomeIcon icon={faYoutube} className="text-red-600" />
                          YouTube
                        </>
                      )}
                      {video.platform === 'vimeo' && 'Vimeo'}
                      {video.platform === 'other' && 'Video'}
                    </p>
                  </div>

                  {/* Remove button */}
                  <button
                    onClick={() => handleRemoveVideo(index)}
                    className="text-gray-400 hover:text-red-600 transition-colors flex-shrink-0 p-1"
                    title="Remove video"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              📌 Drag videos to reorder. Single video displays large, 2+ videos show in carousel.
            </p>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No videos yet. Add one above to get started!
          </div>
        )}

        {/* Save Button */}
        {videos.length > 0 && (
          <SubmitButton
            onClick={handleSaveVideos}
            disabled={loading}
            className="w-full"
          >
            {loading ? 'Saving Videos...' : 'Save Videos'}
          </SubmitButton>
        )}
      </div>
    </SectionBox>
  );
}
