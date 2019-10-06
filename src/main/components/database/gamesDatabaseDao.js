'use strict';
const documentClient = require('serverless-dynamodb-client').doc;

const NotFoundError = require('../error/NotFoundError');

const insert = (game) => {
  const params = {
    TableName: process.env.DYNAMODB_GAME_TABLE,
    Item: game
  };

  return documentClient.put(params).promise()
    .then(() => game)
    .catch(() => {
      throw Error('Failed to update game state');
    });
};

const getById = (id) => {
  const params = {
    TableName: process.env.DYNAMODB_GAME_TABLE,
    Key: {
      'id': id
    }
  };

  return documentClient.get(params).promise()
    .then((data) => {
      if (typeof data.Item === "undefined") {
        throw new NotFoundError('Game not found');
      } else {
        return data.Item;
      }
    })
    .catch((e) => {
      if (e instanceof NotFoundError) {
        throw e;
      } else {
        throw new Error('Failed to retrieve game from database');
      }
    });
};

module.exports = {
  insert,
  getById
};
