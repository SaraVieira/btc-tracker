import {
  DynamoDBClient,
  PutItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

import { DBITem } from "./types";
import { randomUUID } from "crypto";

export const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export const sendVote = async (item: DBITem) => {
  const id = randomUUID().toString();
  const sendItemCommand = new PutItemCommand({
    TableName: "btc-tracker",
    Item: {
      id: {
        S: item.id || id,
      },
      userID: {
        S: item.userID,
      },
      timestamp: {
        S: new Date().toString(),
      },
      vote: {
        S: item.vote,
      },
      ...(item.points !== undefined && {
        points: {
          S: item.points.toString(),
        },
      }),
    },
  });

  try {
    await client.send(sendItemCommand);
    return id;
  } catch (error) {
    console.error(error);
  }
};

export const getUserVotes = async (userID: string) => {
  const command = new ScanCommand({
    ExpressionAttributeValues: {
      ":ui": {
        S: userID,
      },
    },
    FilterExpression: "userID = :ui",
    TableName: "btc-tracker",
  });

  try {
    const response = await client.send(command);
    return (
      response.Items?.map((item) => parseInt(item.points?.S || "0")).reduce(
        (acc, curr) => {
          acc += curr;

          return acc;
        },
        0
      ) || 0
    );
  } catch (error) {
    console.error(error);
    return 0;
  }
};
