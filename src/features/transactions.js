const { GelatoRelay } = require('@gelatonetwork/relay-sdk');

const { chainId, gelatoApiKey } = require('../config');
const { funder } = require('../utils');

const relay = new GelatoRelay();

const fundLocalTransaction = (
  { body: { target: to, ...rest }, onFinish, pendingRequests = 0 },
  reply,
) => {
  reply.raw.on('close', () => {
    onFinish();
  });

  return funder
    .getTransactionCount()
    .then((nonce) =>
      funder.sendTransaction({
        ...rest,
        to,
        nonce: nonce + pendingRequests,
      }),
    )
    .then((tx) => tx.wait())
    .then((receipt) => ({ taskId: '0x', receipt }));
};
const fundGelatoTransaction = ({ body }, _) =>
  relay.sponsoredCall({ ...body, chainId }, gelatoApiKey);

module.exports = {
  fundLocalTransaction,
  fundGelatoTransaction,
};
