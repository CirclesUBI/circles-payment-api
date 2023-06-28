const { GelatoRelay } = require('@gelatonetwork/relay-sdk');

const { chainId, gelatoApiKey } = require('../config');

const relay = new GelatoRelay();

const fundTransaction = async (request, _) =>
  relay.sponsoredCall({ ...request.body, chainId }, gelatoApiKey);

module.exports = {
  fundTransaction,
};
