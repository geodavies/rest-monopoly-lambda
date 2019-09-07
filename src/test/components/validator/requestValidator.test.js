'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const fs = require('fs');

const requestValidator = require('../../../../src/main/components/validator/requestValidator');

describe('Request Validator', function () {

  it('Throws an exception if parsing fails', function () {
    const requestBody = 'INVALID JSON';

    const result = requestValidator.validate(requestBody, 'CreateGameRequest');

    return expect(result).to.be.rejectedWith('Failed to parse request JSON');
  });

  it('Throws an exception if validation fails', function () {
    const requestBody = '{"invalid": "request"}';

    const result = requestValidator.validate(requestBody, 'CreateGameRequest');

    return expect(result).to.be.rejectedWith('Body failed schema validation');
  });

  it('Successfully validates a CreateGameRequest', function () {
    const requestBody = fs.readFileSync('./src/test/resources/requests/games/create/valid.json', 'utf8');

    const result = requestValidator.validate(requestBody, 'CreateGameRequest');

    return expect(result).to.become(JSON.parse(requestBody));
  });

});
