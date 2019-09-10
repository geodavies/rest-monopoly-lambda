'use strict';
const uuid = require('uuid');

const gameDatabaseDao = require('../../components/database/gamesDatabaseDao');
const requestValidator = require('../../components/validator/requestValidator');
const responseGenerator = require('../../components/generator/responseGenerator');

const newGameTemplate = require('../../resources/template/newGame.json');

module.exports.create = (event) => {
  return validateRequest(event.body)
    .then(createNewGameModel)
    .then(insertGameIntoDatabase)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse))
};

function validateRequest(body) {
  return requestValidator.validate(body, 'CreateGameRequest')
    .catch((e) => {
      throw responseGenerator.generateFailureResponse(400, e.message);
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
      throw responseGenerator.generateFailureResponse(502, e.message);
    });
}
