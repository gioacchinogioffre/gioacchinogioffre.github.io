const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Validators', () => {
    beforeEach(() => conn.sync({ force: true }));

      it('should throw an error if name, description, platforms or genres are null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name, description, platforms and genres')))
          .catch(() => done());
      });

      it('should not create the Ability if name is not send', async () => {
        // expect.assertions(1);
        try {
          await Videogame.create({mana_cost: 150.0});
        } catch (error) {
          expect(error.message).toBeDefined();
        }
      });

      // it('should work when its a valid name', () => {
      //   Videogame.create({ name: 'Super Mario Bros' });
      // });
      // it('should work when its a valid rating', () => {
      //   Videogame.create({ rating: '19203809912' });
      // });



  });
});
