import { getBTCPrice, getHistoricalBTCPrice } from "@/lib/coingecko";

import { PriceChart } from "@/components/PriceChart";
import { Voting } from "@/components/Voting";
import { Suspense } from "react";
import { getUserVotes, sendVote } from "@/lib/aws";
import { DBITem } from "@/lib/types";
import { Points } from "@/components/Points";
import { PointsProvider } from "@/lib/PointsProvider";

export default async function Home() {
  const price = await getBTCPrice();
  const historical = await getHistoricalBTCPrice();

  async function getPriceOnVoting() {
    "use server";
    return (await getBTCPrice()).usd;
  }

  async function saveVoteInDB(item: DBITem) {
    "use server";
    return await sendVote(item);
  }

  async function getVotes(id: string) {
    "use server";
    return await getUserVotes(id);
  }

  return (
    <Suspense>
      <PointsProvider getVotes={getVotes}>
        <div className="flex flex-col gap-8">
          <header className="text-center mt-12 mb-4 flex flex-col gap-2">
            <h1 className="font-bold text-2xl">The Bitcoin Game</h1>
            <h3 className="text-muted-foreground max-w-sm mx-auto">
              Guess if the bitcoin price goes up or down in the next 60 seconds
              and win points
            </h3>
            <Points getVotes={getVotes} />
          </header>
          <Voting
            price={price}
            getBTCPrice={getPriceOnVoting}
            saveVoteInDB={saveVoteInDB}
          />
          <h2 className="font-bold text-center text-xl mb-4">
            Bitcoin prices over the last 24 hours
          </h2>
          <PriceChart historical={historical} />
        </div>
      </PointsProvider>
    </Suspense>
  );
}
