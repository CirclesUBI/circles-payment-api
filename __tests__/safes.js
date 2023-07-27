const { build } = require('fastify-cli/helper');
const { ethers } = require('ethers');

const { generateSaltNonce } = require('./utils');

describe('Safes features:', () => {
  const url = '/safes';
  let app;

  beforeAll(async () => {
    app = await build('src');
  });

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
            saltNonce: generateSaltNonce(),
            options: {
              gasLimit: 10000000,
              gasPrice: 9999999,
            },
          },
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(ethers.utils.isAddress(response.body)).toBe(true);
        }));

    it('Should Fund several deployments at once', () => {
      const numberOfDeploys = 3;

      return Promise.all(
        Array.from(Array(numberOfDeploys).keys()).map(() =>
          app.inject({
            url,
            method: 'POST',
            payload: {
              safeAccountConfig: {
                owners: ['0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0'],
                threshold: 1,
              },
              saltNonce: generateSaltNonce(),
              options: {
                gasLimit: 10000000,
                gasPrice: 9999999,
              },
            },
          }),
        ),
      ).then((responses) => {
        expect(responses.length).toBe(numberOfDeploys);
        responses.forEach((response) => {
          expect(response.statusCode).toBe(200);
          expect(ethers.utils.isAddress(response.body)).toBe(true);
        });
      });
    });

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
