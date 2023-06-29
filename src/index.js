const cors = require('@fastify/cors');

const { corsRegex } = require('./config');

// Declare all plugins registration here
module.exports = async (fastify, _) => {
  await fastify.register(cors, {
    origin: [corsRegex],
  });

  fastify.register(require('./routes'));
};
