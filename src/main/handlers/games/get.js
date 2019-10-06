'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

const game = (event) => {
  return common.validateIdAndGetGame(event.pathParameters.gameId)
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

module.exports = {
  game
};
