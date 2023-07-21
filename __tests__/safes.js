const { build } = require('fastify-cli/helper');
const { ethers } = require('ethers');

describe('Safes features:', () => {
  const url = '/safes';
  let app;

  beforeAll(async () => {
    app = await build('src');
  });

  // afterAll(() => app.close());
  describe(`POST - ${url} (Safe deployment funding)`, () => {
    it('Should Fund the deployment of a Safe', () =>
      app
        .inject({
          url,
          method: 'POST',
          payload: {
            safeAccountConfig: {
              owners: ['0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0'],
              threshold: 1,
            },
            saltNonce: new Date().getTime(),
          },
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(ethers.utils.isAddress(response.body)).toBe(true);
        }));

    it('Should fail on funding with wrong parameters', () =>
      app
        .inject({
          url,
          method: 'POST',
        })
        .then((response) => {
          expect(response.statusCode).toBe(500);
        }));
  });
});
