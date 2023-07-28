const transactions = require('./transactions');

module.exports = async (fastify, _) => {
  fastify.register(transactions);
};
