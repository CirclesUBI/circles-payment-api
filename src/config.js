const {
  FUNDER_ACCOUNT_PRIVATE_KEY: funderAccount,
  GELATO_RELAY_API_KEY: gelatoApiKey,
  RPC_URL: rpcUrl,
} = process.env;

module.exports = {
  funderAccount,
  gelatoApiKey,
  rpcUrl,
};
