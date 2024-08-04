// src/controllers/downloadController.js
const { getVideoInfo } = require('../services/youtubeService');

const downloadVideo = async (req, res) => {
  const { url } = req.query;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const formats = await getVideoInfo(url);
    return res.json({ formats });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { downloadVideo };
