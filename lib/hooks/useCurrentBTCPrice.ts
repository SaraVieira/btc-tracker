import { useCallback, useEffect, useState } from "react";

export const useCurrentBTCPrice = ({
  getBTCPrice,
  defaultPrice,
}: {
  getBTCPrice: () => Promise<number>;
  defaultPrice: number;
}) => {
  const [currentPrice, setCurrentPrice] = useState(defaultPrice);

  const getCurrentPrice = useCallback(async () => {
    const data = await getBTCPrice();
    setCurrentPrice(data);

    return data;
  }, [getBTCPrice]);

  useEffect(() => {
    const interval = setInterval(getCurrentPrice, 30000);
    return () => clearInterval(interval);
  }, [getBTCPrice, getCurrentPrice]);

  return { currentPrice, refetch: getCurrentPrice };
};
