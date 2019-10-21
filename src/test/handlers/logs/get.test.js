'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const commonTests = require('../sharedHandlerTestHelpers');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const get = require('../../../main/handlers/logs/get');

describe('Get Logs Handler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets logs of a game', () => {
    const expectedResponseBody = ['Test player bought a house for Pall Mall'];
    const game = {logs: expectedResponseBody};

    commonTests.success200(get.logs, sandbox, gamesDatabaseDao, game, expectedResponseBody);
  });

  it('Returns 400 if game ID is invalid', () => {
    commonTests.invalidId400(get.logs, sandbox, gamesDatabaseDao);
  });

  it('Returns 404 if no game found in database', () => {
    commonTests.noGame404(get.logs, sandbox, gamesDatabaseDao);
  });

  it('Returns 502 if database call fails', () => {
    commonTests.databaseError502(get.logs, sandbox, gamesDatabaseDao);
  });

});
