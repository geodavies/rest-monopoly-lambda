'use strict';
const gamesDatabaseDao = require('../../components/database/gamesDatabaseDao');
const responseGenerator = require('../../components/generator/responseGenerator');
const idUtility = require('../../components/utility/idUtility');

const NotFoundError = require('../../components/error/NotFoundError');

module.exports.validateGameId = (id) => {
  return validateId(id, 'Game ID is invalid');
};

module.exports.validatePlayerId = (id) => {
  return validateId(id, 'Player ID is invalid');
};

module.exports.getGameFromDatabase = (id) => {
  return gamesDatabaseDao.getById(id)
    .catch((e) => {
      if (e instanceof NotFoundError) {
        throw responseGenerator.generateFailureResponse(404);
      } else {
        throw responseGenerator.generateFailureResponse(502, e.message);
      }
    });
};

module.exports.validateIdAndGetGameField = (gameId, fieldName) => {
  return module.exports.validateIdAndGetGame(gameId)
    .then((game) => game[fieldName])
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

module.exports.validateIdAndGetGame = (gameId) => {
  return Promise.resolve(gameId)
    .then(module.exports.validateGameId)
    .then(module.exports.getGameFromDatabase);
};

const validateId = (id, errorMessage) => {
  const valid = idUtility.validateId(id);
  if (!valid) {
    throw responseGenerator.generateFailureResponse(400, errorMessage);
  }
  return id;
};
