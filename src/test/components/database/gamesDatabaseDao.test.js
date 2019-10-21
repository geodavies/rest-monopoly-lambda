'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');

const dynamoDb = require('serverless-dynamodb-client').doc;

const gamesDatabaseDao = require('../../../../src/main/components/database/gamesDatabaseDao');

describe('Games Database DAO', function () {

  const sandbox = sinon.createSandbox();
  const testGame = {};
  const testGameId = '00000000-0000-0000-0000-000000000000';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully inserts a game into the database', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'put')
      .returns({promise: () => Promise.resolve()});

    const result = gamesDatabaseDao.insert(testGame);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.become(testGame);
  });

  it('Throws an error if insert fails', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'put')
      .returns({promise: () => Promise.reject('INSERT FAILURE')});

    const result = gamesDatabaseDao.insert(testGame);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.rejectedWith('Failed to create game');
  });

  it('Successfully gets a game by id from the database', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'get')
      .returns({promise: () => Promise.resolve({Item: testGame})});

    const result = gamesDatabaseDao.getById(testGameId);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.become(testGame);
  });

  it('Throws an error if get game by id fails', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'get')
      .returns({promise: () => Promise.reject('GET FAILURE')});

    const result = gamesDatabaseDao.getById(testGameId);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.rejectedWith('Failed to retrieve game');
  });

  it('Throws a NotFoundError if get game by id finds no item', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'get')
      .returns({promise: () => Promise.resolve({})});

    const result = gamesDatabaseDao.getById(testGameId);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.rejectedWith('Game not found');
  });

});
