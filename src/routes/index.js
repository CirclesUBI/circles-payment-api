const { transactions } = require('../features');
const safes = require('./safes');

module.exports = async (fastify, _) => {
  fastify.post('/transactions', transactions.fundTransaction);
  fastify.register(safes);
};
