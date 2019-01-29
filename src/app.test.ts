import { application } from './app';
import * as supertest from 'supertest';

describe('Milleneuim node falcon', () => {
  const request = supertest(application);

  it('responds as expected on startup', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
  });
});
