export const getBTCPrice = async () => {
  const data = (await fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&x_cg_demo_api_key=${process.env.COINGECKO_KEY}&precision=18`
  ).then((rsp) => rsp.json())) as { bitcoin: { usd: number } };

  return data.bitcoin;
};

export const getHistoricalBTCPrice = async (
  { days }: { days?: number } = { days: 1 }
) => {
  const data = (await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&x_cg_demo_api_key=${process.env.COINGECKO_KEY}&days=${days}`
  ).then((rsp) => rsp.json())) as { prices: number[][] };

  return data.prices.map(([date, price]) => ({
    date: date,
    price,
  }));
};
