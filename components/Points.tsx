"use client";

import { usePoints } from "@/lib/PointsProvider";

export const Points = ({
  getVotes,
}: {
  getVotes(id: string): Promise<number>;
}) => {
  const { votes } = usePoints();

  return (
    <p>
      <span className="text-muted-foreground">Current points:</span> {votes}
    </p>
  );
};
