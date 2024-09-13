import React, { useState } from 'react';
import axios from 'axios';

function LinkP() {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState([]);
  const [error, setError] = useState(null);

  const handleDownload = async () => {
    if (videoId.trim() === '') {
      alert('Please enter a valid YouTube link.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/video-details', {
        params: { videoId: extractVideoId(videoId) },
      });

      const videos = response.data.videos || [];
      const filteredVideos = filterVideosByQuality(videos);

      if (filteredVideos.length > 0) {
        setVideoDetails(filteredVideos);
      } else {
        setVideoDetails([]);
        alert('No videos found with the desired quality and audio.');
      }

      setError(null);
      alert('Video details fetched successfully!');
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching video details.');
      alert('An error occurred while fetching video details.');
    }
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
    <div className="relative flex justify-center items-center h-screen">
      {/* Iframe as the background */}
      <iframe
        src="https://lottie.host/embed/131618d0-608f-4aeb-b681-5dcf015bf8aa/xzFv9dQHgy.json"
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: -1 }}
        frameBorder="0"
      ></iframe>

      {/* Content */}
      <div className="flex flex-col justify-center items-center space-y-6 p-8 relative z-10 max-w-lg w-full">
        <label className="text-gray-700 font-semibold text-lg" htmlFor="youtube-link">
          YouTube link here
        </label>
        <input
          id="youtube-link"
          type="text"
          className="border rounded-md p-4 text-lg w-full text-gray-700"
          placeholder="Enter YouTube link"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button className="Btn px-6 py-3 text-lg flex items-center space-x-2" onClick={handleDownload}>
          <svg
            className="svgIcon h-6 w-6"
            viewBox="0 0 384 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
          <span className="tooltip">Download</span>
        </button>

        {error && <p className="text-red-500 text-lg">{error}</p>}

        {videoDetails.length > 0 && (
          <div className="w-full mt-6">
            <h3 className="font-semibold text-lg">
              Downloaded Video Details by Quality:
            </h3>
            {videoDetails.map((category) => (
              <div key={category.quality} className="mb-6">
                <h4 className="font-semibold text-md">{category.quality} Videos</h4>
                {category.videos.map((video, index) => (
                  <div
                    key={index}
                    className="border rounded-md p-4 bg-gray-100"
                  >
                    <p className="font-semibold text-md">
                      Title: {video.title || 'Unknown Title'}
                    </p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline text-md"
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
