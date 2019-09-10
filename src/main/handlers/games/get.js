'use strict';
const gameDatabaseDao = require('../../components/database/gamesDatabaseDao');
const responseGenerator = require('../../components/generator/responseGenerator');

const NotFoundError = require('../../components/error/NotFoundError');

module.exports.get = (event) => {
  return Promise.resolve(event.pathParameters.id)
    .then(validateGameId)
    .then(getGameFromDatabase)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse))
};

function validateGameId(id) {
  const pattern = new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i); // V4 UUID
  const valid = pattern.test(id);
  if (!valid) {
    throw responseGenerator.generateFailureResponse(400, 'Game ID is invalid');
  }
  return id;
}

function getGameFromDatabase(id) {
  return gameDatabaseDao.getById(id)
    .catch((e) => {
      if (e instanceof NotFoundError) {
        throw responseGenerator.generateFailureResponse(404);
      } else {
        throw responseGenerator.generateFailureResponse(502, e.message);
      }
    });
}
