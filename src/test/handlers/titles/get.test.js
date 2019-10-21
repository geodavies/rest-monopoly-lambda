'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');
const get = require('../../../main/handlers/titles/get');

describe('Get Property Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a property of a game', () => {
    const property = {name: 'My Property'};
    const databaseResponse = {titles: {properties: [property]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.property({pathParameters: {gameId: validTestId, propertyIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(property)
    });
  });

  it('Returns 400 if the propertyIndex is invalid', () => {
    const result = get.property({pathParameters: {gameId: validTestId, propertyIndex: '-1'}});

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

  it('Returns 404 if the propertyIndex is out of bounds', () => {
    const property = {name: 'My Property'};
    const databaseResponse = {titles: {properties: [property]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.property({pathParameters: {gameId: validTestId, propertyIndex: '1'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Property not found'})
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.property({pathParameters: {gameId: validTestId, propertyIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });

});

describe('Get Station Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a station of a game', () => {
    const station = {name: 'My Station'};
    const databaseResponse = {titles: {stations: [station]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.station({pathParameters: {gameId: validTestId, stationIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(station)
    });
  });

  it('Returns 400 if the stationIndex is invalid', () => {
    const result = get.station({pathParameters: {gameId: validTestId, stationIndex: '-1'}});

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

  it('Returns 404 if the stationIndex is out of bounds', () => {
    const station = {name: 'My Station'};
    const databaseResponse = {titles: {stations: [station]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.station({pathParameters: {gameId: validTestId, stationIndex: '1'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Station not found'})
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.station({pathParameters: {gameId: validTestId, stationIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });

});

describe('Get Utility Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a utility of a game', () => {
    const utility = {name: 'My Utility'};
    const databaseResponse = {titles: {utilities: [utility]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.utility({pathParameters: {gameId: validTestId, utilityIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(utility)
    });
  });

  it('Returns 400 if the utilityIndex is invalid', () => {
    const result = get.utility({pathParameters: {gameId: validTestId, utilityIndex: '-1'}});

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

  it('Returns 404 if the utilityIndex is out of bounds', () => {
    const utility = {name: 'My Utility'};
    const databaseResponse = {titles: {utilities: [utility]}};

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(databaseResponse));

    const result = get.utility({pathParameters: {gameId: validTestId, utilityIndex: '1'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Utility not found'})
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.utility({pathParameters: {gameId: validTestId, utilityIndex: '0'}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });
});
