const app = require('../../src/app');
const request = require('supertest');
describe('Users controller', () => {
  it('should not access private routes without authorization header', async () => {
    const response = await request(app).put(`/users/12345`);
    expect(response.status).toBe(401);
    expect(response.body.error).toBe('No token provided');
  });

  it('should not access private routes with wrong token length', async () => {
    const response = await request(app)
      .put(`/users/12345`)
      .set('Authorization', 'Bearer token token');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token error');
  });

  it('should not access private routes with malformatted token', async () => {
    const response = await request(app)
      .put(`/users/12345`)
      .set('Authorization', 'NotBearer token');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token malformatted');
  });

  it('should not access private routes with invalid token', async () => {
    const response = await request(app)
      .put(`/users/12345`)
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(401);
    expect(response.body.error).toBe('Token invalid');
  });
});
