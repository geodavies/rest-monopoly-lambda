'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');

const gameDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const NotFoundError = require('../../../main/components/error/NotFoundError');

const get = require('../../../main/handlers/games/get');

describe('Get Game Handler', () => {

  const sandbox = sinon.createSandbox();
  const validTestUuid = 'AAAAAAAA-AAAA-4AAA-AAAA-AAAAAAAAAAAA';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a game', () => {
    const expectedResponseBody = {"Test": "Game"};

    const databaseStub = sandbox.stub(gameDatabaseDao, 'getById')
      .returns(Promise.resolve(expectedResponseBody));

    const result = get.get({pathParameters: {id: validTestUuid}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(expectedResponseBody)
    });
  });

  it('Returns 400 if game ID is invalid', () => {
    const expectedResponseBody = {"Test": "Game"};

    const databaseStub = sandbox.stub(gameDatabaseDao, 'getById')
      .returns(Promise.resolve(expectedResponseBody));

    const result = get.get({pathParameters: {id: 'INVALID UUID'}});

    expect(databaseStub.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Game ID is invalid'
      })
    });
  });

  it('Returns 404 if no game found in database', () => {
    const databaseStub = sandbox.stub(gameDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = get.get({pathParameters: {id: validTestUuid}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404
    });
  });

  it('Returns 502 if database call fails', () => {
    const databaseStub = sandbox.stub(gameDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = get.get({pathParameters: {id: validTestUuid}});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: JSON.stringify({
        reason: 'TEST ERROR'
      })
    });
  });

});