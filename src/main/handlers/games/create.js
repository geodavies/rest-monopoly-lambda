'use strict';
const uuid = require('uuid');

const gameDatabaseDao = require('../../components/database/gamesDatabaseDao');
const requestValidator = require('../../components/validator/requestValidator');

const newGameTemplate = require('../../resources/template/newGame.json');

module.exports.create = (event) => {
  return validateRequest(event.body)
    .then(createNewGameModel)
    .then(insertGameIntoDatabase)
    .then(generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse))
};

function validateRequest(body) {
  return requestValidator.validate(body, 'CreateGameRequest')
    .catch((e) => {
      throw generateFailureResponse(400, e);
    })
}

function createNewGameModel(body) {
  return Object.assign({}, newGameTemplate, {
    id: uuid.v4(),
    name: body.name
  });
}

function insertGameIntoDatabase(game) {
  return gameDatabaseDao.insert(game)
    .then(() => game)
    .catch((e) => {
      throw generateFailureResponse(500, e);
    });
}

function generateSuccessResponse(game) {
  return {
    statusCode: 200,
    body: JSON.stringify(game)
  }
}

function generateFailureResponse(statusCode, reason) {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      reason: reason
    })
  }
}