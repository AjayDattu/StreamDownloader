const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 4000;
const LANGUAGE_VERSIONS = {
  "python3": "3.9.7",    // Example version
  "javascript": "14.17.6",
  "java": "17",
  "c": "11",
  "ruby": "3.0.2",
  "shell": "5.8",
  // Add more languages and versions as needed
};
app.use(bodyParser.json());

const API = axios.create({
  baseURL: 'https://emkc.org/api/v2/piston',
});

app.post('/execute', async (req, res) => {
  const { language, sourceCode } = req.body;

  try {
    const response = await API.post('/execute', {
      language: language,
      version: LANGUAGE_VERSIONS[language],
      files: [
        {
          content: sourceCode,
        },
      ],
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to execute code', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
