# Advanced URL Shortener API

## Overview
The Advanced URL Shortener API provides functionality to create shortened URLs, track detailed analytics, implement user authentication via Google Sign-In, and group URLs under specific topics. It is designed with scalability and performance in mind, utilizing Redis caching, rate limiting, and Dockerized deployment.

---

## Features
1. **User Authentication**:
   - Google Sign-In for secure session management.
   - User registration and login endpoints.

2. **URL Shortening**:
   - Generate short URLs for long, complex URLs.
   - Option to use custom aliases.

3. **Analytics**:
   - Detailed insights for individual URLs, topics, and overall usage.
   - Metrics include total clicks, unique users, device types, operating systems, and more.

4. **Topic-Based Grouping**:
   - Categorize URLs under specific topics (e.g., acquisition, retention).

5. **Rate Limiting**:
   - Prevent abuse by restricting API usage within defined limits.

6. **Caching**:
   - Redis for improved performance and reduced database load.

7. **Scalability**:
   - Dockerized for easy deployment on cloud platforms.

---

## API Endpoints

### 1. User Authentication
- **Google Sign-In**: Secure user authentication.

### 2. Create Short URL
- **Endpoint**: `/api/shorten`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
      "longUrl": "<original URL>",
      "customAlias": "<optional custom alias>",
      "topic": "<optional topic>"
  }
  ```
- **Response**:
  ```json
  {
      "shortUrl": "<generated short URL>",
      "createdAt": "<timestamp>"
  }
  ```

### 3. Redirect Short URL
- **Endpoint**: `/api/shorten/{alias}`
- **Method**: `GET`
- **Response**: Redirects to the original long URL.

### 4. Get URL Analytics
- **Endpoint**: `/api/analytics/{alias}`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "totalClicks": 100,
      "uniqueClicks": 80,
      "clicksByDate": [ {"date": "YYYY-MM-DD", "clicks": 10} ],
      "osType": [ {"osName": "Windows", "uniqueClicks": 50, "uniqueUsers": 30} ],
      "deviceType": [ {"deviceName": "Mobile", "uniqueClicks": 60, "uniqueUsers": 40} ]
  }
  ```

### 5. Get Topic-Based Analytics
- **Endpoint**: `/api/analytics/topic/{topic}`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "totalClicks": 200,
      "uniqueClicks": 150,
      "clicksByDate": [ {"date": "YYYY-MM-DD", "clicks": 20} ],
      "urls": [ {"shortUrl": "<short URL>", "totalClicks": 50, "uniqueClicks": 30} ]
  }
  ```

### 6. Get Overall Analytics
- **Endpoint**: `/api/analytics/overall`
- **Method**: `GET`
- **Response**:
  ```json
  {
      "totalUrls": 10,
      "totalClicks": 500,
      "uniqueClicks": 400,
      "clicksByDate": [ {"date": "YYYY-MM-DD", "clicks": 50} ],
      "osType": [ {"osName": "Android", "uniqueClicks": 200, "uniqueUsers": 150} ],
      "deviceType": [ {"deviceName": "Desktop", "uniqueClicks": 300, "uniqueUsers": 250} ]
  }
  ```

---

## Technical Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Caching**: Redis
- **Authentication**: Google Sign-In
- **Containerization**: Docker

---

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in a `.env` file:
   ```env
   MONGO_URI=<MongoDB connection string>
   REDIS_URI=<Redis connection string>
   GOOGLE_CLIENT_ID=<Google OAuth client ID>
   GOOGLE_CLIENT_SECRET=<Google OAuth client secret>
   JWT_SECRET=<your JWT secret>
   PORT=<application port>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

---

## Deployment
1. Build Docker image:
   ```bash
   docker build -t url-shortener-api .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 url-shortener-api
   ```

3. Deploy to a cloud platform (e.g., AWS, Heroku).

---

## Testing
Run the test suite to validate functionality:
```bash
npm test
```

---

## Documentation
API documentation is available via Swagger:
- Access Swagger UI at: `http://localhost:<PORT>/api-docs`

---

## Potential Improvements
- Add link expiration feature.
- Generate QR codes for short URLs.
- Include advanced analytics dashboards.
- Enhance security with additional rate limiting mechanisms.
