const { GelatoRelay } = require('@gelatonetwork/relay-sdk');

const { chainId, gelatoApiKey, env } = require('../config');
const { funder } = require('../utils');

const relay = new GelatoRelay();

const fundTransaction = async ({ body }, _) => {
  let result;

  switch (env) {
    case 'production':
      result = relay.sponsoredCall({ ...body, chainId }, gelatoApiKey);
      break;
    default:
      result = funder
        .sendTransaction({ to: body.target, data: body.data })
        .then((data) => ({ taskId: '0x', data }));
  }

  return result;
};

module.exports = {
  fundTransaction,
};
