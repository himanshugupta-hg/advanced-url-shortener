const express = require('express');
const router = express.Router();
const { createShortUrl, getAnalytics, redirectUrl } = require('../controllers/urlController');

// Create a short URL
router.post('/shorten', createShortUrl);

// Redirect to the original URL
router.get('/:shortUrl', redirectUrl);

// Get analytics for a URL
router.get('/:shortUrl/analytics', getAnalytics);

module.exports = router;
