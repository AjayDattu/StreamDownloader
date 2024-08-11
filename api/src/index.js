const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(express.json()); // for parsing application/json

app.post('/get-video-details', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).send('Video ID is required');
  }

  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
    params: { videoId },
    headers: {
      'x-rapidapi-key': 'f19d73c296msh4416db469383f01p1bec96jsnc051ff7e2d7c',
      'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving video details');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
