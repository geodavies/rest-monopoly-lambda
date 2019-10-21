'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const idUtility = require('../../../main/components/utility/idUtility');
const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const NotFoundError = require('../../../main/components/error/NotFoundError');

const common = require('../../../main/handlers/common/common');

describe('Common Handler Functions', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('validateGameId returns id if validation is successful', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const result = common.validateGameId(validTestId);

    expect(idUtilityStub.calledOnce);

    return expect(result).to.equal(validTestId);
  });

  it('validateGameId returns 400 if validation fails', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(false);

    expect(() => common.validateGameId("INVALID ID")).to.throw().that.deep.equals({
      statusCode: 400,
      body: '{\"reason\":\"Game ID is invalid\"}'
    });

    expect(idUtilityStub.calledOnce);
  });

  it('validatePlayerId returns id if validation is successful', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const result = common.validatePlayerId(validTestId);

    expect(idUtilityStub.calledOnce);

    return expect(result).to.equal(validTestId);
  });

  it('validatePlayerId returns 400 if validation fails', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(false);

    expect(() => common.validatePlayerId("INVALID ID")).to.throw().that.deep.equals({
      statusCode: 400,
      body: '{\"reason\":\"Player ID is invalid\"}'
    });

    expect(idUtilityStub.calledOnce);
  });

  it('getGameFromDatabase successfully gets a game from the database', () => {
    const testGameJson = {"Test": "Game"};

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(testGameJson));

    const result = common.getGameFromDatabase(validTestId);

    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.become(testGameJson);
  });

  it('getGameFromDatabase returns 404 when no game is found', () => {
    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = common.getGameFromDatabase(validTestId);

    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.eventually.be.rejected.and.deep.equal({
      statusCode: 404,
      body: JSON.stringify({reason: 'Game not found'})
    });
  });

  it('getGameFromDatabase returns 502 if an error occurs', () => {
    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = common.getGameFromDatabase(validTestId);

    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.eventually.be.rejected.and.deep.equal({
      statusCode: 502,
      body: '{\"reason\":\"TEST ERROR\"}'
    });
  });

  it('validateIdAndGetGame successfully validates ID and gets a game from the database', () => {
    const testGameJson = {"Test": "Game"};

    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(testGameJson));

    const result = common.validateIdAndGetGame(validTestId);

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.become(testGameJson);
  });

  it('validateIdAndGetGame returns 400 if validation fails', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(false);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve());

    const result = common.validateIdAndGetGame('INVALID ID');

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    expect(result).to.eventually.be.rejected.and.deep.equal({
      statusCode: 400,
      body: '{\"reason\":\"Game ID is invalid\"}'
    });
  });

  it('validateIdAndGetGame returns 404 when no game is found', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = common.validateIdAndGetGame(validTestId);

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.eventually.be.rejected.and.deep.equal({
      statusCode: 404,
      body: JSON.stringify({reason: 'Game not found'})
    });
  });

  it('validateIdAndGetGame returns 502 if an error occurs', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = common.validateIdAndGetGame(validTestId);

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.eventually.be.rejected.and.deep.equal({
      statusCode: 502,
      body: '{\"reason\":\"TEST ERROR\"}'
    });
  });

  it('validateIdAndGetGameField successfully validates ID and gets a game from the database', () => {
    const testFieldValue = {"TEST": "VALUE"};
    const testGameJson = {"testFieldName": testFieldValue};

    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve(testGameJson));

    const result = common.validateIdAndGetGameField(validTestId, 'testFieldName');

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: JSON.stringify(testFieldValue)
    });
  });

  it('validateIdAndGetGameField returns 400 if validation fails', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(false);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.resolve());

    const result = common.validateIdAndGetGameField('INVALID ID', 'testFieldName');

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    expect(result).to.become({
      statusCode: 400,
      body: '{\"reason\":\"Game ID is invalid\"}'
    });
  });

  it('validateIdAndGetGameField returns 404 when no game is found', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new NotFoundError('TEST ERROR')));

    const result = common.validateIdAndGetGameField(validTestId);

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.become({
      statusCode: 404,
      body: JSON.stringify({reason: 'Game not found'})
    });
  });

  it('validateIdAndGetGameField returns 502 if an error occurs', () => {
    const idUtilityStub = sandbox.stub(idUtility, 'validateId')
      .returns(true);

    const gamesDatabaseDaoStub = sandbox.stub(gamesDatabaseDao, 'getById')
      .returns(Promise.reject(new Error('TEST ERROR')));

    const result = common.validateIdAndGetGameField(validTestId);

    expect(idUtilityStub.calledOnce);
    expect(gamesDatabaseDaoStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: '{\"reason\":\"TEST ERROR\"}'
    });
  });

  it('validateIndex successfully validates index 0', () => {
    const result = common.validateIndex('0');

    expect(result).to.equal('0');
  });

  it('validateIndex successfully validates index 100', () => {
    const result = common.validateIndex('100');

    expect(result).to.equal('100');
  });

  it('validateIndex returns 400 for negative integers', () => {
    expect(() => common.validateIndex('-1')).to.throw().that.deep.equals({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

  it('validateIndex returns 400 for strings', () => {
    expect(() => common.validateIndex('INVALID')).to.throw().that.deep.equals({
      statusCode: 400,
      body: JSON.stringify({
        reason: 'The index is not a valid positive integer'
      })
    });
  });

});