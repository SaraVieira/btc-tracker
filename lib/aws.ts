import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";

export const client = new DynamoDBClient({
  region: "eu-north-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_KEY as string,
  },
});

export const getItems = async () => {
  const getItemsCommand = new ScanCommand({
    TableName: "btc-tracker",
  });

  try {
    const data = await client.send(getItemsCommand);
    return data.Items;
    // process data.
  } catch (error) {
    console.error(error);
  } finally {
    // finally.
  }
};
