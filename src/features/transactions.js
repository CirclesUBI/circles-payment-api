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
    .then((tx) => tx.wait());
};
const fundGelatoTransaction = ({ body }, _) =>
  relay.sponsoredCall({ ...body, chainId }, gelatoApiKey).then(({ taskId }) => {
    // Let's wait for Gelato to execute task and give us a final task state
    const checkStatus = () =>
      new Promise((resolve) =>
        setTimeout(() => relay.getTaskStatus(taskId).then(resolve), 3000),
      ).then((task) => {
        if (task.taskState === 'ExecReverted') {
          throw new Error('The task transaction has been reverted');
        }

        if (task.taskState === 'Cancelled') {
          throw new Error(task.lastCheckMessage);
        }

        if (task.taskState === 'ExecSuccess') {
          return task;
        }

        return checkStatus();
      });

    return new Promise((resolve, reject) =>
      checkStatus().then(resolve).catch(reject),
    );
  });

module.exports = {
  fundLocalTransaction,
  fundGelatoTransaction,
};
