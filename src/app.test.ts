import { application } from './app';
import * as supertest from 'supertest';
import { connectDB, tearDown } from './db';

describe('Milleneuim node falcon', () => {
  const request = supertest(application);

  afterAll(async () => {
    await tearDown();
  })

  beforeAll(async () => {
    await connectDB();
  });

  it('responds as expected on startup', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
