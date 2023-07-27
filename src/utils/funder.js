const { ethers } = require('ethers');

const { funderAccount, rpcUrl } = require('../config');

const funder = new ethers.Wallet(
  funderAccount,
  new ethers.providers.JsonRpcProvider(rpcUrl),
);

module.exports = funder;
