import React, { useEffect, useState } from 'react';
import { fetchDataFromS3, saveDataToDynamoDB, invokeLambdaFunction } from '../services/cloudService';
import { handleError } from '../utils/errorHandler';

const CloudComponent = () => {
  const [data, setData] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const s3Data = await fetchDataFromS3('my-bucket', 'my-key');
        setData(s3Data);
      } catch (error) {
        handleError(error);
      }
    };
    fetchData();
  }, []);

  const handleSave = async () => {
    try {
      await saveDataToDynamoDB('my-table', { id: '1', data });
    } catch (error) {
      handleError(error);
    }
  };

  const handleInvoke = async () => {
    try {
      const result = await invokeLambdaFunction('my-function', { data });
      console.log(result);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div>
      <h1>Data from S3: {data}</h1>
      <button onClick={handleSave}>Save to DynamoDB</button>
      <button onClick={handleInvoke}>Invoke Lambda</button>
    </div>
  );
};

export default CloudComponent;