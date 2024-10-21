import { useEffect, useState } from "react";

export const useCurrentBTCPrice = ({
  getBTCPrice,
  defaultPrice,
}: {
  getBTCPrice: () => Promise<number>;
  defaultPrice: number;
}) => {
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);

  const getCurrentPrice = async () => {
    const data = await getBTCPrice();
    setCurrentPrice(data);

    return data;
  };

  useEffect(() => {
    const interval = setInterval(getCurrentPrice, 30000);
    return () => clearInterval(interval);
  }, [getBTCPrice]);

  return { currentPrice, refetch: getCurrentPrice };
};
