import request from 'supertest';
import app from '../src/app';

describe('Express App', () => {
  it('should return Hello World at the root route', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello World');
  });

  it('should return health status at the /health route', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: 'UP' });
  });

  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('*');
    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({ error: 'Not Found' });
  });
});
