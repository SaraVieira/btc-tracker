"use client";

import {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  createContext,
} from "react";

import FingerprintJS from "@fingerprintjs/fingerprintjs";

const PointsContext = createContext<{
  votes: number | null;
  getUserPoints: () => Promise<void>;
}>({
  votes: 0,
  getUserPoints: async () => {},
});

function PointsProvider({
  children,
  getVotes,
}: {
  children: React.ReactNode;
  getVotes(id: string): Promise<number>;
}) {
  const userID = useRef<string>("");
  const [votes, setVotes] = useState<number | null>(null);

  const getFingerPrint = async () => {
    const fpPromise = FingerprintJS.load();
    const fp = await fpPromise;
    const result = await fp.get();

    userID.current = result.visitorId;
  };

  const getUserPoints = useCallback(async () => {
    if (!userID.current) {
      await getFingerPrint();
    }
    const currentVotes = await getVotes(userID.current);
    setVotes(currentVotes);
  }, [getVotes]);

  useEffect(() => {
    getUserPoints();
  }, [getUserPoints]);

  return (
    <PointsContext.Provider value={{ votes, getUserPoints }}>
      {children}
    </PointsContext.Provider>
  );
}

function usePoints() {
  const context = useContext(PointsContext);
  if (context === undefined) {
    throw new Error("usePoints must be used within a PointsProvider");
  }
  return context;
}

export { PointsProvider, usePoints };
