'use strict';
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const sinon = require('sinon');

const commonTests = require('../sharedHandlerTestHelpers');

const gamesDatabaseDao = require('../../../main/components/database/gamesDatabaseDao');

const get = require('../../../main/handlers/players/get');

describe('Get Players Handler', () => {

  const sandbox = sinon.createSandbox();

  afterEach(function () {
    sandbox.restore();
  });

  it('Successfully gets players of a game', () => {
    const expectedResponseBody = ["test", "players"];
    const game = {players: expectedResponseBody};

    commonTests.success200(get.get, sandbox, gamesDatabaseDao, game, expectedResponseBody);
  });

  it('Returns 400 if game ID is invalid', () => {
    commonTests.invalidId400(get.get, sandbox, gamesDatabaseDao);
  });

  it('Returns 404 if no game found in database', () => {
    commonTests.noGame404(get.get, sandbox, gamesDatabaseDao);
  });

  it('Returns 502 if database call fails', () => {
    commonTests.databaseError502(get.get, sandbox, gamesDatabaseDao);
  });

});