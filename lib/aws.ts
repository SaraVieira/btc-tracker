import {
  DynamoDBClient,
  DescribeTableCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";

// a client can be shared by different commands.
export const client = new DynamoDBClient({
  region: "eu-north-1",
  // accessKeyId default can be used while using the downloadable version of DynamoDB.
  // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
  credentials: {
    accessKeyId: "AKIAX2DZERUHSLS6BITT",
    // secretAccessKey default can be used while using the downloadable version of DynamoDB.
    // For security reasons, do not store AWS Credentials in your files. Use Amazon Cognito instead.
    secretAccessKey: "QPjdMl6XHcIlXKUqidAai2tQqk3PvGcn6+WpN70h",
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
    // error handling.
  } finally {
    // finally.
  }
};
