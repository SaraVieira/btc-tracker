"use client";

import { formatAMPM } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { useNow } from "@/lib/useNow";

type Vote = { date: Date; price: number; vote: "up" | "down" };

export const Betting = ({
  price,
  getPriceOnVoting,
}: {
  price: { usd: number };
  getPriceOnVoting: () => Promise<number>;
}) => {
  const [currentVote, setCurrentVote] = useState<
    { date: Date; price: number; vote: "up" | "down" } | undefined
  >();
  const [currentPrice, setCurrentPrice] = useState(price.usd);
  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getPriceOnVoting();
      setCurrentPrice(data);
    }, 30000);
    return () => clearInterval(interval);
  }, [getPriceOnVoting]);

  const vote = async (vote: Vote["vote"]) => {
    const currentPrice = await getPriceOnVoting();
    setCurrentVote({
      date: new Date(),
      price: currentPrice,
      vote,
    });
  };
  const now = useNow(300);
  return (
    <>
      {currentVote ? JSON.stringify(currentVote) : null}
      <section className="grid sm:grid-cols-2 gap-4 items-center justify-center sm:justify-normal">
        <div>
          <Button
            size="lg"
            className="rounded-r-none"
            variant={"success"}
            onClick={() => vote("up")}
          >
            <ArrowUp />
          </Button>
          <Button
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
