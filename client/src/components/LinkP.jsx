import React, { useState } from 'react';
import Spline from '@splinetool/react-spline';
import axios from 'axios';

function LinkP() {
  const [videoId, setVideoId] = useState('');

  const handleDownload = async () => {
    if (videoId.trim() === '') {
      alert('Please enter a valid YouTube link.');
      return;
    }

    try {
      const response = await axios.get('http://localhost:3000/video-details', {
        params: { videoId: extractVideoId(videoId) },
      });
      console.log(response.data);
      alert('Video details fetched successfully!');
      // You can now use response.data to handle the video details
    } catch (error) {
      console.error(error);
      alert('An error occurred while fetching video details.');
    }
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
      </div>
    </div>
  );
}

export default LinkP;
