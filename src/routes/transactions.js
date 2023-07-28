const { env } = require('../config');
const {
  transactions: { fundGelatoTransaction, fundLocalTransaction },
} = require('../features');

const isProduction = env === 'production';
let pendingRequests = 0;

module.exports = async (fastify, _) => {
  fastify.post(
    '/transactions',
    ...(isProduction
      ? []
      : [
          {
            onRequest: (request, reply, done) => {
              request.pendingRequests = pendingRequests;
              pendingRequests += 1;
              done();
            },
            onResponse: (request, reply, done) => {
              pendingRequests -= 1;
              done();
            },
          },
        ]),
    isProduction ? fundGelatoTransaction : fundLocalTransaction,
  );
};
