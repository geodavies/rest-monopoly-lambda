'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

module.exports.trades = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'trades');
};

module.exports.trade = (event) => {
  return Promise.resolve()
    .then(() => common.validateTradeId(event.pathParameters.tradeId))
    .then(() => common.validateIdAndGetGame(event.pathParameters.gameId))
    .then((game) => getTradeFromGame(game, event.pathParameters.tradeId))
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const getTradeFromGame = (game, tradeId) => {
  const filteredTrades = game.trades.filter((trade) => trade.id === tradeId);
  if (filteredTrades.length === 1) {
    return filteredTrades[0];
  } else {
    throw responseGenerator.generateFailureResponse(404, 'Trade not found');
  }
};
