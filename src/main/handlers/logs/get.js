'use strict';
const common = require('../common/common');

module.exports.logs = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'logs');
};
