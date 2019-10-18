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

const getPropertyForGame = (game, propertyIndex) => {
  const properties = game.titles.properties;
  if (propertyIndex > properties.length - 1) {
    throw responseGenerator.generateFailureResponse(404, 'Property not found');
  } else {
    return properties[propertyIndex];
  }
};

module.exports = {
  property
};
