# circles-payment-api

Proxy API for funding transactions with Gelato Relay and deploying safes with a funder account

## Local Development

### Installation

```bash
npm install
```

### Set up .env file

For development environment:

```bash
cp .env.example .env
```

For staging environment:

```bash
cp .env.staging.example .env
```

Required env variables to run:

```
FUNDER_ACCOUNT_PRIVATE_KEY=
GELATO_RELAY_API_KEY=
RPC_URL=
CHAIN_ID=
```

### Run

```bash
npm start
```

This command starts a local development server and serves a Swagger UI at the `/docs` endpoint for documentation and example usage.

### Test

For development environment:

```bash
npm test
```

For staging environment:

```bash
npm run test:staging
```

### Using Gelato Relay

By default the service will use a common wallet for funding transactions unless the `NODE_ENV` environment variable value is set to `production` explicitly, then the Gelato Relay will be used instead. This is especially important for local development with Ganache network because of Gelato not supporting it.
