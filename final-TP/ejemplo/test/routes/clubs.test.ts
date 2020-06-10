import request = require('supertest');
import app from '../../src/app';
// import { ClubService } from '../../src/services/';
// import { Club } from '../../src/types';
import * as chalk from 'chalk';
import { inspect } from 'util';

import './setup';

describe('/clubs', () => {
  const body = {
    property: 'property',
  };

  const route = '/clubs';

  let JWT: string;
  it('login a user - should return 200', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({ email: 'tester@chester.com', password: 'PASSWORD' })
      .expect(200);
    JWT = response.body.token;
  });

  it('GET should return 501', async () => {
    // TODO: IMPLEMENT
    const response = await request(app).get(route).set('Authorization', `Bearer ${JWT}`);
    expect(response.status).toBe(501);
  });

  it('POST should return 501', async () => {
    // TODO: IMPLEMENT
    const response = await request(app)
      .post(route)
      .set('Authorization', `Bearer ${JWT}`)
      .send(body);
    expect(response.status).toBe(501);
  });

  it('DELETE should return 501', async () => {
    // TODO: IMPLEMENT
    const response = await request(app)
      .delete(route)
      .set('Authorization', `Bearer ${JWT}`)
      .send(body);
    expect(response.status).toBe(501);
  });

  describe('/:Id', () => {
    const Id = 'Id';

    it('GET should return 501', async () => {
      // TODO: IMPLEMENT
      const response = await request(app)
        .get(`${route}/${Id}`)
        .set('Authorization', `Bearer ${JWT}`);
      console.log(chalk.bgBlueBright(inspect(response.body)));
      expect(response.status).toBe(501);
    });

    it('PUT should return 501', async () => {
      // TODO: IMPLEMENT
      const response = await request(app)
        .put(`${route}/${Id}`)
        .set('Authorization', `Bearer ${JWT}`)
        .send(body);
      expect(response.status).toBe(501);
    });

    it('DELETE should return 501', async () => {
      // TODO: IMPLEMENT
      const response = await request(app)
        .delete(`${route}/${Id}`)
        .set('Authorization', `Bearer ${JWT}`);
      expect(response.status).toBe(501);
    });

    describe('/teams', () => {
      it('GET should return 501', async () => {
        // TODO: IMPLEMENT
        const response = await request(app)
          .get(`${route}/${Id}/teams`)
          .set('Authorization', `Bearer ${JWT}`);
        expect(response.status).toBe(501);
      });

      it('POST should return 501', async () => {
        // TODO: IMPLEMENT
        const response = await request(app)
          .get(`${route}/${Id}/teams`)
          .set('Authorization', `Bearer ${JWT}`);
        expect(response.status).toBe(501);
      });
    });
  });
});
