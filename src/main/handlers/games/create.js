'use strict';
const AWS = require('aws-sdk');
const uuid = require('uuid');

const requestValidator = require('../../components/requestValidator');

const createGameRequestSchema = require('../../resources/schema/CreateGameRequest');
const newGameTemplate = require('../../resources/template/newGame.json');

const dbClient = new AWS.DynamoDB.DocumentClient(
  process.env.IS_OFFLINE ? {region: 'localhost', endpoint: 'http://localhost:8000'} : {}
);

module.exports.create = (event) => {
  return requestValidator.validate(event.body, createGameRequestSchema)
    .then(createNewGameModel)
    .then(insertGameIntoDatabase)
    .then(generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse))
};

function createNewGameModel(body) {
  return Object.assign({}, newGameTemplate, {
    id: uuid.v4(),
    name: body.name
  });
}

function insertGameIntoDatabase(game) {
  const params = {
    TableName: process.env.DYNAMODB_GAME_TABLE,
    Item: game
  };

  return dbClient.put(params).promise()
    .then(() => game)
    .catch(() => {
      throw {
        statusCode: 500,
        body: JSON.stringify({
          reason: 'Failed to update game state'
        })
      }
    });
}

function generateSuccessResponse(game) {
  return {
    statusCode: 200,
    body: JSON.stringify(game)
  }
}
