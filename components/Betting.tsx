"use client";

import { formatAMPM } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNow } from "@/lib/useNow";
import { useCurrentBTCPrice } from "@/lib/useCurrentBTCPrice";
import { DBITem, Vote } from "@/lib/types";

const seconds = 10;

export const Betting = ({
  price,
  getBTCPrice,
  saveVoteInDB,
  getVotes,
}: {
  price: { usd: number };
  getBTCPrice: () => Promise<number>;
  saveVoteInDB(item: DBITem): Promise<string | undefined>;
  getVotes(id: string): Promise<void>;
}) => {
  const [currentVote, setCurrentVote] = useState<Vote | undefined>();
  const [currentResult, setCurrentResult] = useState<{
    userID: string;
    points: number;
  } | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const now = useNow();
  const { currentPrice } = useCurrentBTCPrice({
    defaultPrice: price.usd,
    getBTCPrice,
  });

  const vote = async (vote: Vote["vote"]) => {
    const currentPrice = await getBTCPrice();
    const newVote = {
      userID: "",
      date: new Date(),
      price: currentPrice,
      vote,
    };
    setCurrentVote(newVote);
    setTimeLeft(seconds);
  };

  const calculatePoints = (currentPrice: number) => {
    if (!currentVote) return 0;
    if (currentVote?.vote === "down") {
      return currentPrice < currentVote.price ? 1 : 0;
    }

    return currentPrice > currentVote?.price ? 1 : 0;
  };

  const getResult = async () => {
    const currentPrice = await getBTCPrice();
    setCurrentVote(undefined);
    const vote = {
      points: calculatePoints(currentPrice),
      userID: currentVote?.userID!,
      vote: currentVote?.vote!,
    };
    await saveVoteInDB(vote);
    setCurrentResult(vote);
  };

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
  }, [now]);

  return (
    <>
      {currentVote ? JSON.stringify(timeLeft) : null}
      {currentResult ? JSON.stringify(currentResult) : null}
      <section className="grid sm:grid-cols-2 gap-4 items-center justify-center sm:justify-normal">
        <div className="flex flex-wrap justify-center sm:justify-normal">
          <Button
            disabled={Boolean(timeLeft)}
            size="lg"
            className="rounded-r-none"
            variant={"success"}
            onClick={() => vote("up")}
          >
            <ArrowUp />
          </Button>
          <Button
            disabled={Boolean(timeLeft)}
            size="lg"
            className="rounded-l-none"
            variant={"destructive"}
            onClick={() => vote("down")}
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
