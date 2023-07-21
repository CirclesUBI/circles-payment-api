# circles-payment-api

Proxy API for funding transactions with Gelato Relay and deploying safes with a funder account

## Local Development

### Installation

```bash
npm install
```

### Set up .env file

```bash
cp .env.example .env
```

Required env variables to run:

```
FUNDER_ACCOUNT_PRIVATE_KEY=
GELATO_RELAY_API_KEY=
RPC_URL=
CHAIN_ID=
```

In some networks, as development, you must specify the deployed Safe contract addresses with the following env vars:

```
SAFE_MASTER_COPY_ADDRESS=
SAFE_PROXY_FACTORY_ADDRESS=
FALLBACK_HANDLER_ADDRESS=
MULTI_SENT_ADDRESS=
MULTI_SEND_CALL_ONLY_ADDRESS=
```

### Run

```bash
npm start
```

This command starts a local development server and serves a Swagger UI at the `/docs` endpoint for documentation and example usage.

### Test

```bash
npm test
```

### Using Gelato Relay

By default the service will use a local strategy for funding transactions with a funder account unless the `NODE_ENV` environment variable value is set to `production`, then Gelato Relay will be used instead. This is especially important for local development with Ganache network because of Gelato not supporting it.
