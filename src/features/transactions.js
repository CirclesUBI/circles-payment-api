const { GelatoRelay } = require('@gelatonetwork/relay-sdk');

const { chainId, gelatoApiKey } = require('../config');
const { funder } = require('../utils');

const relay = new GelatoRelay();

const fundLocalTransaction = (
  { body: { target: to, ...rest }, pendingRequests },
  _,
) =>
  funder
    .getTransactionCount()
    .then((nonce) =>
      funder.sendTransaction({
        ...rest,
        to,
        nonce: nonce + pendingRequests + 1,
      }),
    )
    .then((response) => response.wait())
    .then((receipt) => ({ taskId: '0x', receipt }));
const fundGelatoTransaction = ({ body }, _) =>
  relay.sponsoredCall({ ...body, chainId }, gelatoApiKey);

module.exports = {
  fundLocalTransaction,
  fundGelatoTransaction,
};
