const fastify = require('fastify');

module.exports = (opts = {}) => {
  const app = fastify(opts);

  return app;
};
