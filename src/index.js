// Declare all plugins registration here
module.exports = async (fastify, _) => {
  fastify.register(require('./routes'));
};
