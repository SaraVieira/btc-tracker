"use client";

import { usePoints } from "@/lib/PointsProvider";

export const Points = () => {
  const { votes } = usePoints();

  return (
    <p>
      <span className="text-muted-foreground">Current points:</span> {votes}
    </p>
  );
};
