'use strict';
const gamesDatabaseDao = require('../../components/database/gamesDatabaseDao');
const responseGenerator = require('../../components/generator/responseGenerator');
const idUtility = require('../../components/utility/idUtility');

const NotFoundError = require('../../components/error/NotFoundError');

const validateGameId = (id) => {
  return validateId(id, 'Game ID is invalid');
};

const validatePlayerId = (id) => {
  return validateId(id, 'Player ID is invalid');
};

const validateTradeId = (id) => {
  return validateId(id, 'Trade ID is invalid');
};

const validateIndex = (index) => {
  const pattern = new RegExp(/^[0-9]+$/i);
  const valid = pattern.test(index);
  if (!valid) {
    throw responseGenerator.generateFailureResponse(400, 'The index is not a valid positive integer');
  }
  return index;
};

const getGameFromDatabase = (id) => {
  return gamesDatabaseDao.getById(id)
    .catch((e) => {
      if (e instanceof NotFoundError) {
        throw responseGenerator.generateFailureResponse(404);
      } else {
        throw responseGenerator.generateFailureResponse(502, e.message);
      }
    });
};

const validateIdAndGetGameField = (gameId, fieldName) => {
  return validateIdAndGetGame(gameId)
    .then((game) => game[fieldName])
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const validateIdAndGetGame = (gameId) => {
  return Promise.resolve(gameId)
    .then(validateGameId)
    .then(getGameFromDatabase);
};

const validateId = (id, errorMessage) => {
  const valid = idUtility.validateId(id);
  if (!valid) {
    throw responseGenerator.generateFailureResponse(400, errorMessage);
  }
  return id;
};

module.exports = {
  validateGameId,
  validatePlayerId,
  validateTradeId,
  validateIndex,
  getGameFromDatabase,
  validateIdAndGetGameField,
  validateIdAndGetGame
};
