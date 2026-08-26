import cloudConfig from './cloud.config';
import axios from 'axios';

export const fetchDataFromS3 = async (bucketName, key) => {
  try {
    const params = { Bucket: bucketName, Key: key };
    const data = await cloudConfig.s3.getObject(params).promise();
    return data.Body.toString('utf-8');
  } catch (error) {
    throw new Error(`Error fetching data from S3: ${error.message}`);
  }
};

export const saveDataToDynamoDB = async (tableName, item) => {
  try {
    const params = {
      TableName: tableName,
      Item: item
    };
    await cloudConfig.dynamoDB.putItem(params).promise();
  } catch (error) {
    throw new Error(`Error saving data to DynamoDB: ${error.message}`);
  }
};

export const invokeLambdaFunction = async (functionName, payload) => {
  try {
    const params = {
      FunctionName: functionName,
      InvocationType: 'RequestResponse',
      Payload: JSON.stringify(payload)
    };
    const data = await cloudConfig.lambda.invoke(params).promise();
    return JSON.parse(data.Payload);
  } catch (error) {
    throw new Error(`Error invoking Lambda function: ${error.message}`);
  }
};