import { useEffect, useState } from "react";

export const useNow = (refreshFrequency: number): Date => {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), refreshFrequency);
    return () => clearInterval(interval);
  });
  return now;
};
