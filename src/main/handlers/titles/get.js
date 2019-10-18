'use strict';
const responseGenerator = require('../../components/generator/responseGenerator');
const common = require('../common/common');

const property = (event) => {
  return Promise.resolve()
    .then(() => common.validateIndex(event.pathParameters.propertyIndex))
    .then(() => common.validateIdAndGetGame(event.pathParameters.gameId))
    .then((game) => getPropertyForGame(game, event.pathParameters.propertyIndex))
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const station = (event) => {
  return Promise.resolve()
    .then(() => common.validateIndex(event.pathParameters.stationIndex))
    .then(() => common.validateIdAndGetGame(event.pathParameters.gameId))
    .then((game) => getStationForGame(game, event.pathParameters.stationIndex))
    .then(responseGenerator.generateSuccessResponse)
    .catch(handledErrorResponse => Promise.resolve(handledErrorResponse));
};

const getPropertyForGame = (game, propertyIndex) => {
  const properties = game.titles.properties;
  if (propertyIndex > properties.length - 1) {
    throw responseGenerator.generateFailureResponse(404);
  } else {
    return properties[propertyIndex];
  }
};

const getStationForGame = (game, stationIndex) => {
  const stations = game.titles.stations;
  if (stationIndex > stations.length - 1) {
    throw responseGenerator.generateFailureResponse(404);
  } else {
    return stations[stationIndex];
  }
};

module.exports = {
  property,
  station
};
