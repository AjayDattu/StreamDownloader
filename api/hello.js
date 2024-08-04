const fs = require('fs');
const ytdl = require('ytdl-core');

// Function to download YouTube video
const downloadYouTubeVideo = async (url, outputPath) => {
  try {
    // Check if the URL is valid
    if (!ytdl.validateURL(url)) {
      throw new Error('Invalid YouTube URL');
    }

    // Start downloading the video
    const videoReadableStream = ytdl(url, { filter: 'audioandvideo' });

    // Create a write stream to save the video
    const videoWriteStream = fs.createWriteStream(outputPath);

    // Pipe the readable stream to the write stream
    videoReadableStream.pipe(videoWriteStream);

    // Listen for the 'finish' event to confirm download completion
    videoWriteStream.on('finish', () => {
      console.log('Download completed:', outputPath);
    });

    // Handle errors during download
    videoReadableStream.on('error', (err) => {
      console.error('Error downloading video:', err);
    });

    videoWriteStream.on('error', (err) => {
      console.error('Error writing video to file:', err);
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Replace with your YouTube video URL and desired output path
const youtubeURL = 'https://youtube.com/shorts/UhGXu_K2mUE?si=a-brNvMqG4R4RWEM';
const outputPath = 'video.mp4';

// Start the download
downloadYouTubeVideo(youtubeURL, outputPath);
