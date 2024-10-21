import { useEffect, useState } from "react";

export const useCurrentBTCPrice = ({
  getBTCPrice,
  defaultPrice,
}: {
  getBTCPrice: () => Promise<number>;
  defaultPrice: number;
}) => {
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);

  useEffect(() => {
    const interval = setInterval(async () => {
      const data = await getBTCPrice();
      setCurrentPrice(data);
    }, 30000);
    return () => clearInterval(interval);
  }, [getBTCPrice]);

  return { currentPrice };
};
