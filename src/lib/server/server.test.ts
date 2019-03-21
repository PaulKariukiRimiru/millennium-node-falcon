import * as request from 'supertest';

import * as falcon from './';
import { createFalconApp } from '../index';
import { Users } from '../../Sample/Users';
import { MethodTypes } from './interfaces';

describe('Falcon server function', () => {
  const name = 'paul';
  const testBody = {
    name: 'paul',
  };

  beforeAll(() => {
    createFalconApp();
    new Users()
  });

  afterAll(async () => await falcon.closeServer())

  it.each(
    [
      ['/', 'hello from falcon'],
      [`/${name}`, `hello ${name}`]
    ]
  )('method calls return expected response on get %s ', (url, expected) => {
    return request(falcon.getApp())
      .get(url)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body.message).toBe(expected);
      });
  });

  it.each(
    [
      ['/', testBody],
    ]
  )('method calls return expected response on post %s ', (url, expected) => {
    return request(falcon.getApp())
      .post(url)
      .send(testBody)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expected);
      });
  });

  it.each(
    [
      ['/', testBody],
    ]
  )('method calls return expected response on delete %s ', (url, expected) => {
    return request(falcon.getApp())
      .delete(url)
      .send(testBody)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expected);
      });
  });

  it.each(
    [
      ['/', testBody],
    ]
  )('method calls return expected response on put %s ', (url, expected) => {
    return request(falcon.getApp())
      .put(url)
      .send(testBody)
      .set('Accept', 'application/json')
      .expect(200)
      .then(response => {
        expect(response.body).toEqual(expected);
      });
  });
});
