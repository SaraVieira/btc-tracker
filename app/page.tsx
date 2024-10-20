import { Button } from "@/components/ui/button";
import { getItems } from "@/lib/aws";
import { getBTCPrice, getHistoricalBTCPrice } from "@/lib/coingecko";

import { PriceChart } from "@/components/PriceChart";
import { formatAMPM } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Betting } from "@/components/Betting";

export default async function Home() {
  const items = await getItems();
  const price = await getBTCPrice();
  const historical = await getHistoricalBTCPrice();

  async function getPriceOnVoting() {
    "use server";
    return (await getBTCPrice()).usd;
    // ...
  }
  return (
    <div className="flex flex-col gap-8">
      <header className="text-center mt-12 mb-4 flex flex-col gap-2">
        <h1 className="font-bold text-2xl">The Bitcoin game</h1>
        <h3 className="text-muted-foreground max-w-sm mx-auto">
          Guess if the bitcoin price goes up or down in the next 60 seconds and
          win points
        </h3>
        <p>
          {" "}
          <span className="text-muted-foreground">Current points:</span> 0
        </p>
      </header>
      <Betting price={price} getPriceOnVoting={getPriceOnVoting} />
      <h2 className="font-bold text-center text-xl mb-4">
        Bitcoin prices over the last 24 hours
      </h2>
      <PriceChart historical={historical} />
    </div>
  );
}
