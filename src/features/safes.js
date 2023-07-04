const { ethers } = require('ethers');
const { EthersAdapter, SafeFactory } = require('@safe-global/protocol-kit');

const { contractNetworks, funderAccount, rpcUrl } = require('../config');

const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: new ethers.Wallet(
    funderAccount,
    new ethers.providers.JsonRpcProvider(rpcUrl),
  ),
});
let safeFactory;

const getSafeFactory = async () =>
  safeFactory ||
  SafeFactory.create({
    ethAdapter,
    contractNetworks,
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
