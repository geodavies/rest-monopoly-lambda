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
  const gameToInsert = {};

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully inserts a game into the database', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'put')
      .returns({promise: () => Promise.resolve()});

    const result = gamesDatabaseDao.insert(gameToInsert);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.become(gameToInsert);
  });

  it('Throws an exception if insert fails', function () {
    const dynamoDbStub = sandbox.stub(dynamoDb, 'put')
      .returns({promise: () => Promise.reject('INSERT FAILURE')});

    const result = gamesDatabaseDao.insert(gameToInsert);

    expect(dynamoDbStub.calledOnce);

    return expect(result).to.rejectedWith('Failed to update game state');
  });

});
