"use client";

import { formatAMPM } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNow } from "@/lib/hooks/useNow";
import { DBITem } from "@/lib/types";
import { useVotes } from "@/lib/hooks/useVotes";
import { Result } from "./Result";

const seconds = 10;

export const Voting = ({
  price,
  getBTCPrice,
  saveVoteInDB,
}: {
  price: { usd: number };
  getBTCPrice: () => Promise<number>;
  saveVoteInDB: (item: DBITem) => Promise<string | undefined>;
}) => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const now = useNow();

  const { currentResult, currentVote, getResult, vote, currentPrice } =
    useVotes({
      saveVoteInDB,
      defaultPrice: price.usd,
      getBTCPrice,
    });

  useEffect(() => {
    if (timeLeft) {
      if (currentVote) {
        setTimeLeft(
          seconds - (new Date().getTime() - currentVote.date.getTime()) / 1000
        );
      }

      if (Math.floor(timeLeft) === 0 || Math.floor(timeLeft) < 0) {
        setTimeLeft(null);
        getResult();
      }
    }
  }, [now, getResult]);

  return (
    <>
      <Result
        timeLeft={timeLeft}
        currentResult={currentResult}
        currentVote={currentVote}
      />
      <section className="grid sm:grid-cols-2 gap-4 items-center justify-center sm:justify-normal">
        <div className="flex flex-wrap justify-center sm:justify-normal">
          <Button
            disabled={Boolean(timeLeft)}
            size="lg"
            className="rounded-r-none"
            variant={"success"}
            onClick={() => {
              vote("up");
              setTimeLeft(seconds);
            }}
          >
            <ArrowUp />
          </Button>
          <Button
            disabled={Boolean(timeLeft)}
            size="lg"
            className="rounded-l-none"
            variant={"destructive"}
            onClick={() => {
              vote("down");
              setTimeLeft(seconds);
            }}
          >
            <ArrowDown />
          </Button>
        </div>
        <ul className="flex flex-col gap-2">
          <li>
            <span className="text-muted-foreground">Current price:</span> $
            {currentPrice}
          </li>
          <li>
            <span className="text-muted-foreground">Current time:</span>{" "}
            {formatAMPM(now, true)}
          </li>
        </ul>
      </section>
    </>
  );
};
