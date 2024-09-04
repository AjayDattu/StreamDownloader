const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/video-details', async (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://youtube-media-downloader.p.rapidapi.com/v2/video/details',
    params: {
      videoId: req.query.videoId || 'G33j5Qi4rE8', // Use query parameter or default ID
    },
    headers: {
      'x-rapidapi-key': 'f19d73c296msh4416db469383f01p1bec96jsnc051ff7e2d7c',
      'x-rapidapi-host': 'youtube-media-downloader.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    res.json(response.data); // Send the response back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while fetching video details');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
