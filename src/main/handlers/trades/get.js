'use strict';
const common = require('../common/common');

module.exports.trades = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'trades');
};
