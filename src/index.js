const { corsRegex } = require('./config');

// Declare all plugins registration here
module.exports = async (fastify, _) => {
  await fastify.register(require('@fastify/swagger'), {
    mode: 'static',
    specification: {
      path: `${require('path').resolve(__dirname, './docs/index.yaml')}`,
    },
  });

  await fastify.register(require('@fastify/swagger-ui'), {
    routePrefix: '/docs',
    uiConfig: {
      deepLinking: false,
    },
  });

  await fastify.register(require('@fastify/cors'), {
    origin: [corsRegex],
  });

  fastify.register(require('./routes'));
};
