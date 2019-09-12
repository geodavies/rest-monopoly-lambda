'use strict';
const gamesDatabaseDao = require('../../components/database/gamesDatabaseDao');
const responseGenerator = require('../../components/generator/responseGenerator');
const idUtility = require('../../components/utility/idUtility');

const NotFoundError = require('../../components/error/NotFoundError');

module.exports.validateGameId = (id) => {
  const valid = idUtility.validateId(id);
  if (!valid) {
    throw responseGenerator.generateFailureResponse(400, 'Game ID is invalid');
  }
  return id;
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
