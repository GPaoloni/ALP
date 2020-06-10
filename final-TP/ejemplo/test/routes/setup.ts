import app from '../../src/server';
import request = require('supertest');
// import * as chalk from 'chalk';
// import { inspect } from 'util';

beforeAll(async () => {
  const loginOK = (
    await request(app)
      .post('/auth/login')
      .send({ email: 'tester@chester.com', password: 'PASSWORD' })
  ).ok;

  if (!loginOK) {
    const userForm = {
      email: 'tester@chester.com',
      password: 'PASSWORD',
      lname: 'Tester',
      fname: 'Chester',
      role: 'guest',
      username: 'testerchester',
    };

    const response = await request(app).post('/auth/register').send(userForm);
    const { activationToken } = response.body;
    await request(app).get(`/auth/activate/${activationToken}`);
  }
});

beforeEach(function (done) {
  setTimeout(() => {
    done();
  }, 100);
});

afterAll(async () => {
  app.close();
  //  console.log(chalk.bgGreen('\n Server closed \n'));
});
