'use strict';
const dynamoDb = require('serverless-dynamodb-client').doc;

module.exports.insert = (game) => {
  const params = {
    TableName: process.env.DYNAMODB_GAME_TABLE,
    Item: game
  };

  return dynamoDb.put(params).promise()
    .then(() => game)
    .catch(() => {
      throw 'Failed to update game state';
    });
};
