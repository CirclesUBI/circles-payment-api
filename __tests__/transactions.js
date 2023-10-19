const { build } = require('fastify-cli/helper');

describe('Transactions features:', () => {
  const url = '/transactions';
  let app;

  beforeAll(async () => {
    app = await build('src');
  });

  const payload = {
    target: '0xC6474F25cEa06619DccA60b2236d3bd04eB20CAa',
    data: '0x371303c0',
  };

  describe(`POST - ${url} (Transaction funding)`, () => {
    it('Should fund a transaction', () =>
      app
        .inject({
          url,
          method: 'POST',
          payload,
        })
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(typeof response.json().transactionHash).toBe('string');
        }));

    it('Should Fund several transactions', () => {
      const numberOfTxs = 3;

      return Promise.all(
        Array.from(Array(numberOfTxs).keys()).map(() =>
          app.inject({
            url,
            method: 'POST',
            payload,
          }),
        ),
      ).then((responses) => {
        expect(responses.length).toBe(numberOfTxs);
        responses.forEach((response) => {
          expect(response.statusCode).toBe(200);
          expect(typeof response.json().transactionHash).toBe('string');
        });
      });
    });

    it('Should fail on incorrect transaction', () =>
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
