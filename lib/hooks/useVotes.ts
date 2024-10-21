import { useState } from "react";
import { DBITem, Result, Vote } from "../types";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useCurrentBTCPrice } from "./useCurrentBTCPrice";
import { usePoints } from "../PointsProvider";

export const useVotes = ({
  saveVoteInDB,
  getBTCPrice,
  defaultPrice,
}: {
  saveVoteInDB(item: DBITem): Promise<string | undefined>;
  defaultPrice: number;
  getBTCPrice: () => Promise<number>;
}) => {
  const { getUserPoints } = usePoints();
  const { currentPrice, refetch } = useCurrentBTCPrice({
    defaultPrice,
    getBTCPrice,
  });
  const [currentVote, setCurrentVote] = useState<Vote | null>(null);
  const [currentResult, setCurrentResult] = useState<Result | null>(null);

  const vote = async (vote: Vote["vote"]) => {
    setCurrentResult(null);
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    const newVote = {
      userID: result.visitorId,
      date: new Date(),
      price: currentPrice,
      vote,
    };
    setCurrentVote(newVote);
  };

  const calculatePoints = (oldPrice: number, currentPrice: number) => {
    if (!oldPrice || !currentPrice) return 0;
    if (currentVote?.vote === "down") {
      return currentPrice < oldPrice ? 1 : 0;
    }

    return currentPrice > oldPrice ? 1 : 0;
  };

  const getResult = async () => {
    if (!currentVote?.userID || !currentVote.vote) return;
    let oldPrice = currentPrice;
    const newPrice = await refetch();

    const vote = {
      points: calculatePoints(oldPrice, newPrice),
      userID: currentVote?.userID,
      vote: currentVote?.vote,
    };
    await saveVoteInDB(vote);
    setCurrentResult({
      ...vote,
      price: newPrice,
      betPrice: oldPrice,
    });
    await getUserPoints();
    setCurrentVote(null);
  };

  return {
    getResult,
    currentResult,
    currentVote,
    vote,
    currentPrice,
  };
};
