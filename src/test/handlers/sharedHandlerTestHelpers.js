'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const NotFoundError = require('../../main/components/error/NotFoundError');

const validTestId = 'ABcde12345';

module.exports.success200 = (functionToTest, sandbox, gamesDatabaseDao, databaseResponse, expectedResponseBody) => {
  const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
    .returns(Promise.resolve(databaseResponse));

  const result = functionToTest({pathParameters: {gameId: validTestId}});

  expect(databaseStub.calledOnce);

  return expect(result).to.become({
    statusCode: 200,
    body: JSON.stringify(expectedResponseBody)
  });
};

module.exports.invalidId400 = (functionToTest, sandbox, gamesDatabaseDao) => {
  const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
    .returns({});

  const result = functionToTest({pathParameters: {gameId: 'INVALID UUID'}});

  expect(databaseStub.notCalled);

  return expect(result).to.become({
    statusCode: 400,
    body: JSON.stringify({
      reason: 'Game ID is invalid'
    })
  });
};

module.exports.noGame404 = (functionToTest, sandbox, gamesDatabaseDao) => {
  const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
    .returns(Promise.reject(new NotFoundError('TEST ERROR')));

  const result = functionToTest({pathParameters: {gameId: validTestId}});

  expect(databaseStub.calledOnce);

  return expect(result).to.become({
    statusCode: 404
  });
};

module.exports.databaseError502 = (functionToTest, sandbox, gamesDatabaseDao) => {
  const databaseStub = sandbox.stub(gamesDatabaseDao, 'getById')
    .returns(Promise.reject(new Error('TEST ERROR')));

  const result = functionToTest({pathParameters: {gameId: validTestId}});

  expect(databaseStub.calledOnce);

  return expect(result).to.become({
    statusCode: 502,
    body: JSON.stringify({
      reason: 'TEST ERROR'
    })
  });
};
