'use strict';
const common = require('../common/common');

const logs = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'logs');
};

module.exports = {
  logs
};
