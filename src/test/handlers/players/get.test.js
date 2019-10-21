'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const commonTests = require('../sharedHandlerTestHelpers');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const get = require('../../../main/handlers/players/get');

const NotFoundError = require('../../../main/components/error/NotFoundError');

describe('Get Players Handler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets players of a game', () => {
    const expectedResponseBody = ["test", "players"];
    const game = {players: expectedResponseBody};

    return commonTests.success200(get.players, sandbox, gamesDatabaseDao, game, expectedResponseBody);
  });

  it('Returns 400 if game ID is invalid', () => {
    return commonTests.invalidId400(get.players, sandbox, gamesDatabaseDao);
  });

  it('Returns 404 if no game found in database', () => {
    return commonTests.noGame404(get.players, sandbox, gamesDatabaseDao);
  });

  it('Returns 502 if database call fails', () => {
    return commonTests.databaseError502(get.players, sandbox, gamesDatabaseDao);
  });

});

describe('Get Player Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a player of a game', () => {
    const player = {id: validTestId};
    const databaseResponse = {players: [player]};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.player({pathParameters: {gameId: validTestId, playerId: validTestId}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(player)
    });
  });

  it('Returns 400 if game ID is invalid', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns({});

    const result = get.player({pathParameters: {gameId: 'INVALID UUID', playerId: validTestId}});

    expect(databaseStub.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Game ID is invalid'
      })
    });
  });

  it('Returns 400 if player ID is invalid', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns({});

    const result = get.player({pathParameters: {gameId: validTestId, playerId: 'INVALID UUID'}});

    expect(databaseStub.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Player ID is invalid'
      })
    });
  });

  it('Returns 404 if no game found in database', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = get.player({pathParameters: {gameId: validTestId, playerId: validTestId}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Game not found'})
    });
  });

  it('Returns 404 if player not found in game', () => {
    const databaseResponse = {players: []};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.player({pathParameters: {gameId: validTestId, playerId: validTestId}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({
        reason: 'Player not found'
      })
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.player({pathParameters: {gameId: validTestId, playerId: validTestId}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });

});