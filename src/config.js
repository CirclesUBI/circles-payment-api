const {
  CHAIN_ID: chainId,
  FUNDER_ACCOUNT_PRIVATE_KEY: funderAccount,
  GELATO_RELAY_API_KEY: gelatoApiKey,
  RPC_URL: rpcUrl,
} = process.env;

module.exports = {
  chainId,
  funderAccount,
  gelatoApiKey,
  rpcUrl,
};
