'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const fs = require('fs');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');
const requestValidator = require('../../../main/components/validator/requestValidator');
const idUtility = require('../../../main/components/utility/idUtility');

const post = require('../../../main/handlers/games/post');

describe('Create Game Handler', () => {

  const sandbox = sinon.createSandbox();

  const validTestId = 'ABcde12345';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully creates a new game', () => {
    const requestBody = fs.readFileSync('./src/test/resources/requests/games/create/valid.json', 'utf8');
    const expectedResponseBody = fs.readFileSync('./src/test/resources/responses/games/create/success.json', 'utf8');

    const validatorStub = sandbox.stub(requestValidator, 'validate')
      .returns(Promise.resolve(JSON.parse(requestBody)));

    const idUtilityStub = sandbox.stub(idUtility, 'generateId')
      .returns(validTestId);

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'insert')
      .returns(Promise.resolve(JSON.parse(requestBody)));

    const result = post.game({body: requestBody});

    expect(validatorStub.calledOnce);
    expect(idUtilityStub.calledOnce);
    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      body: expectedResponseBody
    });
  });

  it('Returns 400 if validation fails', () => {
    const errorReason = 'Body failed schema validation';

    const validatorStub = sandbox.stub(requestValidator, 'validate')
      .returns(Promise.reject(new Error(errorReason)));

    const uuidSpy = sandbox.spy(idUtility.generateId);
    const databaseSpy = sandbox.spy(gamesDatabaseDao.insert);

    const result = post.game({body: '{\"test\":\"request\"}'});

    expect(validatorStub.calledOnce);
    expect(uuidSpy.notCalled);
    expect(databaseSpy.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

  it('Returns 502 if inserting into database fails', () => {
    const errorReason = 'Failed to update game state';

    const validatorStub = sandbox.stub(requestValidator, 'validate')
      .returns(Promise.resolve({"name": "Test Game"}));

    const uuidStub = sandbox.stub(idUtility, 'generateId')
      .returns(validTestId);

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'insert')
      .returns(Promise.reject(new Error('Failed to update game state')));

    const result = post.game({body: '{\"test\":\"request\"}'});

    expect(validatorStub.calledOnce);
    expect(uuidStub.calledOnce);
    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

});