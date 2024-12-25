const URL = require('../models/URL');
const crypto = require('crypto');

// Create a short URL
exports.createShortUrl = async (req, res) => {
  try {
    const { longUrl, customAlias, topic } = req.body;
    const user = req.user; // User from session middleware

    let shortUrl;
    if (customAlias) {
      const existingAlias = await URL.findOne({ customAlias });
      if (existingAlias) return res.status(400).json({ error: 'Custom alias already exists' });
      shortUrl = customAlias;
    } else {
      shortUrl = crypto.randomBytes(3).toString('hex'); // 6 characters
    }

    const url = await URL.create({
      longUrl,
      shortUrl,
      customAlias,
      user: user._id,
      topic,
    });

    res.status(201).json(url);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Redirect to the original URL
exports.redirectUrl = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URL.findOne({ shortUrl });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    // Add analytics
    url.analytics.push({
      timestamp: new Date(),
      userAgent: req.headers['user-agent'],
      ipAddress: req.ip,
    });
    await url.save();

    res.redirect(url.longUrl);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Get analytics for a URL
exports.getAnalytics = async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await URL.findOne({ shortUrl });

    if (!url) return res.status(404).json({ error: 'URL not found' });

    res.status(200).json(url.analytics);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
