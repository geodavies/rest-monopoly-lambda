'use strict';
const AWS = require('aws-sdk');

const dbClient = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? {region: 'localhost', endpoint: 'http://localhost:8000'} : {}
);

module.exports.insert = (game) => {
  const params = {
    TableName: process.env.DYNAMODB_GAME_TABLE,
    Item: game
  };

  return dbClient.put(params).promise()
    .then(() => game)
    .catch(() => {
      throw 'Failed to update game state';
    });
};
