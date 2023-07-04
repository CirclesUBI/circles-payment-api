const {
  CHAIN_ID: chainId,
  CORS_REGEX: corsRegex,
  FUNDER_ACCOUNT_PRIVATE_KEY: funderAccount,
  GELATO_RELAY_API_KEY: gelatoApiKey,
  NODE_ENV: env,
  RPC_URL: rpcUrl,
} = process.env;

module.exports = {
  chainId,
  corsRegex,
  env,
  funderAccount,
  gelatoApiKey,
  rpcUrl,
};
