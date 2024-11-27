const request = require('supertest');
const app = require('../server');

describe('Authentication', () => {
  it('should signup a user', async () => {
    const response = await request(app).post('/api/auth/signup').send({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
    });
    expect(response.status).toBe(201);
  });
});
