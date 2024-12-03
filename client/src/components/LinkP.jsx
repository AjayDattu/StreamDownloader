import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

function LinkP() {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [title,setTitle] = useState(null)
  const key = 'updatable';

  const handleDownload = async () => {
    if (videoId.trim() === '') {
      messageApi.open({
        key,
        type: 'warning',
        content: 'Please Enter valid Link',
        duration: 2,
      });
      return;
    }

    setLoading(true);
    messageApi.open({
      key,
      type: 'loading',
      content: 'Fetching video details...',
    });

    try {
      const response = await axios.get('http://localhost:3000/video-details', {
        params: { videoId: extractVideoId(videoId) },
      });
      setTitle(response.data.channel)
      
      console.log(title)
      const videos = response.data.videos || [];
      const filteredVideos = filterVideosByQuality(videos);

      if (filteredVideos.length > 0) {
        setVideoDetails(filteredVideos);
        messageApi.open({
          key,
          type: 'success',
          content: 'Video details fetched successfully!',
          duration: 2,
        });
        // console.log(videos)
      } else {
        setVideoDetails([]);
        messageApi.open({
          key,
          type: 'warning',
          content: 'No videos found with the desired quality and audio.',
          duration: 2,
        });
      }
      setError(null);
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching video details.');
      messageApi.open({
        key,
        type: 'error',
        content: 'An error occurred while fetching video details.',
        duration: 2,
      });
    }
    setLoading(false);
  };

  const filterVideosByQuality = (videos) => {
    const qualities = ['360p', '720p', '1080p'];
    const filteredVideos = [];

    qualities.forEach((quality) => {
      const videosOfQuality = videos.items.filter(
        (video) => video.quality === quality && video.hasAudio
      );
      if (videosOfQuality.length > 0) {
        filteredVideos.push({
          quality,
          videos: videosOfQuality,
        });
      }
    });

    return filteredVideos;
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  const getThumbnailUrl = (videoId) => `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white px-6 py-10">
      {contextHolder}

      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-semibold text-center text-black">
          YouTube Video Downloader
        </h1>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter YouTube link"
            className="flex-1 p-4  border-black shadow rounded-lg text-gray-300 focus:outline-none focus:ring focus:black"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
          <button
            onClick={handleDownload}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
          >
            {loading ? 'Loading...' : 'Download'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-center">
            {error}
          </p>
        )}

        {videoDetails.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-medium text-gray-200 mb-4">
              Available Downloads:
            </h2>
            <div className="grid gap-6">
              {videoDetails.map((category) => (
                <div key={category.quality} className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-300">
                    {category.quality} Quality
                  </h3>
                  {category.videos.map((video, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition space-y-3"
                    >
                      <img
                        className="w-full h-48 rounded-lg"
                        src={getThumbnailUrl(extractVideoId(videoId))}
                        alt={video.title || 'YouTube Video'}
                      />
                      <h4 className="text-gray-300">Your Video</h4>
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-400 underline"
                      >
                        Download Video
                      </a>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkP;
