'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const commonTests = require('../sharedHandlerTestHelpers');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');
const NotFoundError = require('../../../main/components/error/NotFoundError');

const get = require('../../../main/handlers/trades/get');

describe('Get Trades Handler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets trades of a game', () => {
    const expectedResponseBody = [{"test": "trade"}];
    const game = {trades: expectedResponseBody};

    commonTests.success200(get.trades, sandbox, gamesDatabaseDao, game, expectedResponseBody);
  });

  it('Returns 400 if game ID is invalid', () => {
    commonTests.invalidId400(get.trades, sandbox, gamesDatabaseDao);
  });

  it('Returns 404 if no game found in database', () => {
    commonTests.noGame404(get.trades, sandbox, gamesDatabaseDao);
  });

  it('Returns 502 if database call fails', () => {
    commonTests.databaseError502(get.trades, sandbox, gamesDatabaseDao);
  });

});

describe('Get Trade Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a trade of a game', () => {
    const trade = {'my': 'trade'};
    const databaseResponse = {trades: [trade]};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.trade({pathParameters: {gameId: validTestId, tradeIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(trade)
    });
  });

  it('Returns 400 if game ID is invalid', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns({});

    const result = get.trade({pathParameters: {gameId: 'INVALID UUID', tradeIndex: '0'}});

    expect(databaseStub.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Game ID is invalid'
      })
    });
  });

  it('Returns 400 if player index is invalid', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns({});

    const result = get.trade({pathParameters: {gameId: validTestId, tradeIndex: 'INVALID INDEX'}});

    expect(databaseStub.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

  it('Returns 404 if no game found in database', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = get.trade({pathParameters: {gameId: validTestId, tradeIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Game not found'})
    });
  });

  it('Returns 404 if player not found in game', () => {
    const databaseResponse = {trades: []};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.trade({pathParameters: {gameId: validTestId, tradeIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({
        reason: 'Trade not found'
      })
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.trade({pathParameters: {gameId: validTestId, tradeIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });

});
