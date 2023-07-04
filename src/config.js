const {
  CHAIN_ID: chainId,
  CORS_REGEX: corsRegex,
  FUNDER_ACCOUNT_PRIVATE_KEY: funderAccount,
  GELATO_RELAY_API_KEY: gelatoApiKey,
  NODE_ENV: env,
  RPC_URL: rpcUrl,
  SAFE_MASTER_COPY_ADDRESS: safeMasterCopyAddress,
  SAFE_PROXY_FACTORY_ADDRESS: safeProxyFactoryAddress,
  FALLBACK_HANDLER_ADDRESS: fallbackHandlerAddress,
  MULTI_SENT_ADDRESS: multiSendAddress,
  MULTI_SEND_CALL_ONLY_ADDRESS: multiSendCallOnlyAddress,
} = process.env;

const contractNetworks = safeMasterCopyAddress &&
  safeProxyFactoryAddress &&
  fallbackHandlerAddress &&
  multiSendAddress &&
  multiSendCallOnlyAddress && {
    [chainId]: {
      safeMasterCopyAddress,
      safeProxyFactoryAddress,
      fallbackHandlerAddress,
      multiSendAddress,
      multiSendCallOnlyAddress,
    },
  };

module.exports = {
  chainId,
  contractNetworks,
  corsRegex,
  env,
  funderAccount,
  gelatoApiKey,
  rpcUrl,
};
