'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const commonTests = require('../sharedHandlerTestHelpers');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const get = require('../../../main/handlers/games/get');

describe('Get Game Handler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets a game', () => {
    const expectedResponseBody = {"Test": "Game"};

    commonTests.success200(get.game, sandbox, gamesDatabaseDao, expectedResponseBody, expectedResponseBody);
  });

  it('Returns 400 if game ID is invalid', () => {
    commonTests.invalidId400(get.game, sandbox, gamesDatabaseDao);
  });

  it('Returns 404 if no game found in database', () => {
    commonTests.noGame404(get.game, sandbox, gamesDatabaseDao);
  });

  it('Returns 502 if database call fails', () => {
    commonTests.databaseError502(get.game, sandbox, gamesDatabaseDao);
  });

});