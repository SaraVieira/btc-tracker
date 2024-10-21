export type Vote = {
  date: Date;
  price: number;
  vote: "up" | "down";
  userID: string;
};

export type DBITem = {
  id?: string;
  timestamp?: string;
  userID: string;
  vote: Vote["vote"];
  points?: number;
};
