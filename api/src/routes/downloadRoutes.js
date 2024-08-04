// src/routes/downloadRoutes.js
const express = require('express');
const { downloadVideo } = require('../controllers/downloadController');

const router = express.Router();

router.get('/download', downloadVideo);

module.exports = router;
