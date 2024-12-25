const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const Redis = require('ioredis');
const redis = new Redis();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth');
const urlRoutes = require('./routes/url');

require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 100 requests per 15 minutes
});

app.use('/api', limiter);
app.use('/auth', authRoutes);
app.use('/api', urlRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Database Connection
mongoose.connect(process.env.MONGO_URI, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Retry connection for 5 seconds
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
