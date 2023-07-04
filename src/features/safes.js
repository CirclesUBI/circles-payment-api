const { ethers } = require('ethers');
const { EthersAdapter, SafeFactory } = require('@safe-global/protocol-kit');

const { funderAccount, rpcUrl } = require('../config');

const signer = new ethers.Wallet(
  funderAccount,
  new ethers.providers.JsonRpcProvider(rpcUrl),
);
const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: signer,
});
let safeFactory;
const getSafeFactory = async () =>
  safeFactory ||
  SafeFactory.create({
    ethAdapter,
    isL1SafeMasterCopy: true,
  }).then((_safeFactory) => {
    safeFactory = _safeFactory;

    return safeFactory;
  });

const fundSafeDeploy = async (request, _) =>
  getSafeFactory()
    .then((safeFactory) => safeFactory.deploySafe(request.body))
    .then((safeSdk) => safeSdk.getAddress());

module.exports = {
  fundSafeDeploy,
};
