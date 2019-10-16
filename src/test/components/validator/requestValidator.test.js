'use strict';
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const fs = require('fs');

const requestValidator = require('../../../../src/main/components/validator/requestValidator');

describe('Request Validator', () => {

  it('Successfully validates a GameRequest', () => {
    const requestBody = fs.readFileSync('./src/test/resources/requests/games/create/valid.json', 'utf8');

    const result = requestValidator.validate(requestBody, 'GameRequest');

    return expect(result).to.become(JSON.parse(requestBody));
  });

  it('Throws an error if parsing fails', () => {
    const requestBody = 'INVALID JSON';

    const result = requestValidator.validate(requestBody, 'GameRequest');

    return expect(result).to.be.rejectedWith('Failed to parse request JSON');
  });

  it('Throws an error if validation fails', () => {
    const requestBody = '{"invalid": "request"}';

    const result = requestValidator.validate(requestBody, 'GameRequest');

    return expect(result).to.be.rejectedWith('Body failed schema validation');
  });

});
