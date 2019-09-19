'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

module.exports.logs = (event) => {
  return Promise.resolve(event.pathParameters.gameId)
    .then(common.validateGameId)
    .then(common.getGameFromDatabase)
    .then((game) => game.logs)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};
