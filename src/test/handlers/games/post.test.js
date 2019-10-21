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

    const idUtilityStub = sandbox.stub(idUtility, 'generateId')
      .returns(validTestId);

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'insert')
      .returns(Promise.resolve(JSON.parse(requestBody)));

    const result = post.game({body: requestBody});

    expect(idUtilityStub.calledOnce);
    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 200,
      headers: {
        Location: '/games/ABcde12345'
      },
      body: expectedResponseBody
    });
  });

  it('Returns 400 if validation fails', () => {
    const errorReason = 'Body failed schema validation';

    const result = post.game({body: '{\"test\":\"request\"}'});

    return expect(result).to.become({
      statusCode: 400,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

  it('Returns 502 if inserting into database fails', () => {
    const errorReason = 'Failed to create game';

    const databaseStub = sandbox.stub(gamesDatabaseDao, 'insert')
      .returns(Promise.reject(new Error(errorReason)));

    const result = post.game({body: '{\"name\":\"test\"}'});

    expect(databaseStub.calledOnce);

    return expect(result).to.become({
      statusCode: 502,
      body: `{\"reason\":\"${errorReason}\"}`
    });
  });

});