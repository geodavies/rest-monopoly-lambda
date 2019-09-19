'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

module.exports.get = (event) => {
  return Promise.resolve(event.pathParameters.gameId)
    .then(common.validateGameId)
    .then(common.getGameFromDatabase)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};
