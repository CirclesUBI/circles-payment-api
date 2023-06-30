# circles-payment-api

Proxy API for funding transactions with Gelato 1Balance and deploying safes with a funder account

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

- FUNDER_ACCOUNT_PRIVATE_KEY
- GELATO_RELAY_API_KEY
- RPC_URL
- CHAIN_ID

### Run

```bash
$ npm start
```

This command starts a local development server and serves a Swagger UI at the `/docs` endpoint for documentation and example usage.
