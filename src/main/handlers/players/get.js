'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

module.exports.players = (event) => {
  return common.validateIdAndGetGameField(event.pathParameters.gameId, 'players');
};

module.exports.player = (event) => {
  return Promise.resolve()
    .then(() => common.validatePlayerId(event.pathParameters.playerId))
    .then(() => common.validateIdAndGetGame(event.pathParameters.gameId))
    .then((game) => getPlayerFromGame(game, event.pathParameters.playerId))
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const getPlayerFromGame = (game, playerId) => {
  const filteredPlayers = game.players.filter((player) => player.id === playerId);
  if (filteredPlayers.length === 1) {
    return filteredPlayers[0];
  } else {
    throw responseGenerator.generateFailureResponse(404, 'Player not found');
  }
};
