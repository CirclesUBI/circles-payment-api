const {
  safes: { fundSafeDeploy },
} = require('../features');

let deploymentsQueue = null;

module.exports = async (fastify, _) => {
  fastify.post(
    '/safes',
    {
      onRequest: (request, reply, done) => {
        if (deploymentsQueue) {
          deploymentsQueue.push({ done });
        } else {
          deploymentsQueue = [];

          done();
        }
      },
      onResponse: (request, reply, done) => {
        if (deploymentsQueue.length > 0) {
          const queued = deploymentsQueue.shift();

          queued.done();
        } else {
          deploymentsQueue = null;
        }

        done();
      },
    },
    fundSafeDeploy,
  );
};
