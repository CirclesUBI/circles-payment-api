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
    default: {
      const { target: to, ...rest } = body;

      result = funder
        .sendTransaction({ ...rest, to })
        .then((data) => ({ taskId: '0x', data }));
    }
  }

  return result;
};

module.exports = {
  fundTransaction,
};
