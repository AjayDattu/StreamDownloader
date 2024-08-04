// src/services/youtubeService.js
const ytdl = require('ytdl-core');

const getVideoInfo = async (url) => {
  try {
    const info = await ytdl.getInfo(url);
    return info.formats.map(format => ({
      quality: format.qualityLabel,
      url: format.url,
      mimeType: format.mimeType
    }));
  } catch (error) {
    throw new Error('Failed to get video info');
  }
};

module.exports = { getVideoInfo };
