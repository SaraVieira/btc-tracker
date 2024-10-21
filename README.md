# The Bitcoin Game

Simple premise really, every 60 seconds you can vote if the price of bitcoin is gonna go up or down and if you get lucky you get points.

## Running Locally

Required Envs:

```bash
# API key used to get BTC data
COINGECKO_KEY=

# I use AWS DynamoDB to save the data so you would need a table called "btc-tracker"
AWS_ACCESS_KEY=
AWS_SECRET_KEY=
```

### Install Dependencies

```bash
npm install
# or
yarn
```

### Running development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application
