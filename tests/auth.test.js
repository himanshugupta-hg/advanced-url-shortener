const request = require('supertest');
const app = require('../app');

describe('Auth Routes', () => {
  it('should redirect to Google for authentication', async () => {
    const res = await request(app).get('/auth/google');
    expect(res.statusCode).toBe(302); // Redirect status code
  });
});
