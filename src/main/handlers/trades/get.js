'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

const trades = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'trades');
};

const trade = (event) => {
  return Promise.resolve()
    .then(() => common.validateIndex(event.pathParameters.tradeIndex))
    .then(() => common.validateIdAndGetGame(event.pathParameters.gameId))
    .then((game) => getTradeForGame(game, event.pathParameters.tradeIndex))
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const getTradeForGame = (game, tradeId) => {
  const trades = game.trades;
  if (tradeId > trades.length - 1) {
    throw responseGenerator.generateFailureResponse(404, 'Trade not found');
  } else {
    return trades[tradeId];
  }
};

module.exports = {
  trades,
  trade
};
