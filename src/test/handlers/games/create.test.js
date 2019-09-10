'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const sinon = require('sinon');

const fs = require('fs');

const uuid = require('uuid');
const gameDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');
const requestValidator = require('../../../main/components/validator/requestValidator');

const create = require('../../../main/handlers/games/create');

describe('Create Game Handler', () => {

  const sandbox = sinon.createSandbox();

  const testUuid = '00000000-0000-0000-0000-000000000000';

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully creates a new game', () => {
    const requestBody = fs.readFileSync('./src/test/resources/requests/games/create/valid.json', 'utf8');
    const expectedResponseBody = fs.readFileSync('./src/test/resources/responses/games/create/success.json', 'utf8');

    const validatorStub = sandbox.stub(requestValidator, 'validate')
      .returns(Promise.resolve(JSON.parse(requestBody)));

    const uuidStub = sandbox.stub(uuid, 'v4')
      .returns(testUuid);

    const databaseStub = sandbox.stub(gameDatabaseDao, 'insert')
      .returns(Promise.resolve(JSON.parse(requestBody)));

    const result = create.create({body: requestBody});

    expect(validatorStub.calledOnce);
    expect(uuidStub.calledOnce);
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

    const uuidSpy = sandbox.spy(uuid.v4);
    const databaseSpy = sandbox.spy(gameDatabaseDao.insert);

    const result = create.create({body: '{\"test\":\"request\"}'});

    expect(validatorStub.calledOnce);
    expect(uuidSpy.notCalled);
    expect(databaseSpy.notCalled);

    return expect(result).to.become({
      statusCode: 400,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

  it('Returns 500 if inserting into database fails', () => {
    const errorReason = 'Failed to update game state';

    const validatorStub = sandbox.stub(requestValidator, 'validate')
      .returns(Promise.resolve({"name": "Test Game"}));

    const uuidStub = sandbox.stub(uuid, 'v4')
      .returns(testUuid);

    const databaseStub = sandbox.stub(gameDatabaseDao, 'insert')
      .returns(Promise.reject(new Error('Failed to update game state')));

    const result = create.create({body: '{\"test\":\"request\"}'});

    expect(validatorStub.calledOnce);
    expect(uuidStub.calledOnce);
    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 500,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

});