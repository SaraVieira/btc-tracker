# The Bitcoin Game

## What is this?

Simple premise really, every 60 seconds you can vote if the price of bitcoin is gonna go up or down and if you get lucky you get points.

Play the game: https://btc-tracker.deploy.iamsaravieira.com

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

## How to deploy

The easiest way to deploy a NextJS application would be to use [Vercel](https://vercel.com/) or [Netlify](https://www.netlify.com/) as both these services will automatically detect it's a NextJS application and do all the required fixes for you.

In my case I deployed using a docker image and to do this you can follow the instructions [in the NextJS docs](https://nextjs.org/docs/app/building-your-application/deploying#docker-image)
