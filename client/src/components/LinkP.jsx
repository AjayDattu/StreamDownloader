import React, { useState } from 'react';
import axios from 'axios';
import { message } from 'antd';

function LinkP() {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const key = 'updatable';

  const handleDownload = async () => {
    if (videoId.trim() === '') {
      alert('Please enter a valid YouTube link.');
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

  return (
    <div className="relative flex justify-center items-center h-screen bg-gradient-to-br from-gray-900 to-gray-700 text-gray-100 font-sans">
      {contextHolder}

      {/* Step-by-Step Instructions */}
      <div className="absolute top-4 left-4 bg-gray-800 p-6 shadow-lg rounded border border-gray-600 text-gray-200">
        <h3 className="font-bold text-xl mb-3 text-gray-300">Steps to Download Video:</h3>
        <ol className="list-decimal list-inside space-y-2">
          <li>Enter a valid YouTube link in the input box.</li>
          <li>Click on the "Download" button to fetch video details.</li>
          <li>Select the desired video quality to download.</li>
        </ol>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center space-y-6 p-10 w-full max-w-lg mx-auto bg-gray-800 shadow-lg rounded-lg border border-gray-600">
        <label className="text-gray-300 font-semibold text-lg" htmlFor="youtube-link">
          YouTube link here
        </label>
        <div className='flex flex-row gap-4 w-full'>
          <input
            id="youtube-link"
            type="text"
            className="border border-gray-600 bg-gray-900 rounded-md p-4 text-lg w-full text-gray-100 placeholder-gray-500 focus:ring focus:ring-blue-500"
            placeholder="Enter YouTube link (e.g., https://youtu.be/...)"
            value={videoId}
            onChange={(e) => setVideoId(e.target.value)}
          />
          <button className="bg-blue-600 text-white rounded-md px-6 py-3 flex items-center space-x-2 hover:bg-blue-700 transition-all"
            onClick={handleDownload}
            disabled={loading}
          >
            <svg
              className="svgIcon h-5 w-5 fill-current text-gray-100"
              viewBox="0 0 384 512"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
            </svg>
            <span>Download</span>
          </button>
        </div>

        {/* Loading Spinner */}
        {loading && <p className="text-blue-500">Loading video details...</p>}

        {/* Error Message */}
        {error && <p className="text-red-500 text-lg">{error}</p>}

        {/* Video Details */}
        {videoDetails.length > 0 && (
          <div className="w-full mt-6 text-gray-200">
            <h3 className="font-bold text-xl mb-4 text-gray-300">
              Available Video Downloads by Quality:
            </h3>
            {videoDetails.map((category) => (
              <div key={category.quality} className="mb-6">
                <h4 className="font-semibold text-lg text-gray-400">{category.quality} Quality</h4>
                {category.videos.map((video, index) => (
                  <div
                    key={index}
                    className="border border-gray-700 rounded-md p-4 bg-gray-900 hover:bg-gray-800 transition-all mb-2"
                  >
                    <p className="font-semibold text-md text-gray-300">
                      Title: {video.title || 'Unknown Title'}
                    </p>
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
        )}
      </div>
    </div>
  );
}

export default LinkP;
