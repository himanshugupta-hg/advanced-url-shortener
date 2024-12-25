const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  customAlias: { type: String, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  topic: { type: String },
  analytics: [{
    timestamp: Date,
    userAgent: String,
    ipAddress: String,
    geoLocation: String,
  }],
}, { timestamps: true });

module.exports = mongoose.model('URL', urlSchema);
