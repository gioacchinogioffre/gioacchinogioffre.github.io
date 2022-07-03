/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');
const request = require('supertest')

const agent = session(app);
const videogame = {
  name: 'Super Mario Bros',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  // beforeEach(() => Videogame.sync({ force: true })
  //   .then(() => Videogame.create(videogame)));
  // describe('GET /videogames', () => {
  //   it('should get 200', () =>
  //     agent.get('/videogames').expect(200)
  //   );

  // });


  describe('Parte UNO: POST /character', () => {
    it('should return status 404 and corresponding text if any of the mandatory parameters is not send', async () => {
      const res = await request(app).post('/videogames');
      expect(res.statusCode).toBe(404);
      // expect(res.text).toBe('Falta enviar datos obligatorios');
    });
  })
   

});
