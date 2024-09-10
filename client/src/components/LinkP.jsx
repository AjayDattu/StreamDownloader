import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import axios from 'axios';

function LinkP() {
  const [videoId, setVideoId] = useState('');
  const [videoDetails, setVideoDetails] = useState(null); // State to store video details
  const [error, setError] = useState(null); // State to store any error

  const handleDownload = async () => {
    if (videoId.trim() === '') {
      alert('Please enter a valid YouTube link.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/video-details', {
        params: { videoId: extractVideoId(videoId) },
      });

      // Ensure response data has a 'videos' field and it's an array
      const videos = response.data.videos || [];
      const filteredVideos = filterVideosByQuality(videos);

      if (filteredVideos.length > 0) {
        // Assuming the first filtered video is the desired one
        const video = filteredVideos[0];
        setVideoDetails({
          title: video.title || 'Unknown Title',
          downloadLink: video.url || '#', // Update if the URL field is different
        });
      } else {
        setVideoDetails(null); // Clear video details if no videos match
        alert('No videos found with the desired quality.');
      }

      setError(null); // Reset error on successful fetch
      alert('Video details fetched successfully!');
    } catch (error) {
      console.error(error);
      setError('An error occurred while fetching video details.');
      alert('An error occurred while fetching video details.');
    }
  };

  // Function to filter videos based on quality (e.g., 360p)
  const filterVideosByQuality = (videos) => {
    return videos.items.filter(video => video.quality === '360p'); // Change '360p' to any quality you need
  };

  const extractVideoId = (url) => {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)|youtu\.be\/([a-zA-Z0-9_-]+)/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen p-2">
      <div className="flex justify-center items-center">
        <div className="w-full h-64 sm:h-80 md:h-96">
          <Spline
            scene="https://prod.spline.design/U45h15kJH1rvnz6H/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>
      </div>

      <div className="flex flex-col justify-center items-center space-y-4">
        <label className="text-gray-700 font-semibold" htmlFor="youtube-link">
          YouTube link here
        </label>
        <input
          id="youtube-link"
          type="text"
          className="border rounded-md p-2 w-full max-w-md text-gray-700"
          placeholder="Enter YouTube link"
          value={videoId}
          onChange={(e) => setVideoId(e.target.value)}
        />
        <button className="Btn" onClick={handleDownload}>
          <svg className="svgIcon" viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg">
            <path d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"></path>
          </svg>
          <span className="icon2"></span>
          <span className="tooltip">Download</span>
        </button>

        {/* Display error if any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Display video details below the input field */}
        {videoDetails && (
          <div className="w-full max-w-md mt-4">
            <h3 className="font-semibold text-lg">Downloaded Video Details:</h3>
            <div className="border rounded-md p-4 bg-gray-100">
              <p className="font-semibold">Title: {videoDetails.title}</p>
              <a
                href={videoDetails.downloadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Download Video
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LinkP;
