const request = require('supertest');
const app = require('../app');

describe('URL Shortener', () => {
  it('should create a short URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ longUrl: 'https://example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('shortUrl');
  });

  it('should redirect to the original URL', async () => {
    const res = await request(app).get('/short-url-example');
    expect(res.statusCode).toBe(302); // Redirect
  });
});
