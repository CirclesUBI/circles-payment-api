const { ethers } = require('ethers');
const { EthersAdapter, SafeFactory } = require('@safe-global/protocol-kit');

const { contractNetworks } = require('../config');
const { funder } = require('../utils');

const ethAdapter = new EthersAdapter({
  ethers,
  signerOrProvider: funder,
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
