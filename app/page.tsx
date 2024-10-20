import { Button } from "@/components/ui/button";
import { getItems } from "@/lib/aws";
import { getBTCPrice, getHistoricalBTCPrice } from "@/lib/coingecko";

import { PriceChart } from "@/components/PriceChart";

export default async function Home() {
  const items = await getItems();
  const price = await getBTCPrice();
  const historical = await getHistoricalBTCPrice();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <Button>Sup</Button>
      <PriceChart historical={historical} />
    </div>
  );
}
