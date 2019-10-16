'use strict';
const gamesDatabaseDao = require('../../components/database/gamesDatabaseDao');
const requestValidator = require('../../components/validator/requestValidator');
const responseGenerator = require('../../components/generator/responseGenerator');
const idUtility = require('../../components/utility/idUtility');

const newGameTemplate = require('../../resources/template/newGame.json');

const game = (event) => {
  return validateRequest(event.body)
    .then(createNewGameModel)
    .then(insertGameIntoDatabase)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

function validateRequest(body) {
  return requestValidator.validate(body, 'GameRequest')
    .catch((e) => {
      throw responseGenerator.generateFailureResponse(400, e.message);
    });
}

function createNewGameModel(body) {
  return Object.assign({}, newGameTemplate, {
    id: idUtility.generateId(),
    name: body.name
  });
}

function insertGameIntoDatabase(game) {
  return gamesDatabaseDao.insert(game)
    .then(() => game)
    .catch((e) => {
      throw responseGenerator.generateFailureResponse(502, e.message);
    });
}

module.exports = {
  game
};
