const { safes, transactions } = require('./features');

module.exports = async (fastify, _) => {
  fastify.post('/transactions', transactions.fundTransaction);
  fastify.post('/safes', safes.fundSafeDeploy);
};
