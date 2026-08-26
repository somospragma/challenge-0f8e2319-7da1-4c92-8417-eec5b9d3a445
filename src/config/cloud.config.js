import AWS from 'aws-sdk';

const cloudConfig = {
  s3: new AWS.S3({ region: 'us-west-2' }),
  dynamoDB: new AWS.DynamoDB({ region: 'us-west-2' }),
  lambda: new AWS.Lambda({ region: 'us-west-2' })
};

export default cloudConfig;