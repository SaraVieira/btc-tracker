"use client";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { useEffect, useState } from "react";

export const Points = ({
  getVotes,
}: {
  getVotes(id: string): Promise<number>;
}) => {
  const [votes, setVotes] = useState(0);
  const getUserPoints = async () => {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();
    const v = await getVotes(result.visitorId);
    setVotes(v);
  };

  useEffect(() => {
    getUserPoints();
  }, []);

  return (
    <p>
      <span className="text-muted-foreground">Current points:</span> {votes}
    </p>
  );
};
