'use strict';
const chai = require('chai');
const expect = chai.expect;

const idUtility = require('../../../main/components/utility/idUtility');

describe('ID Utility', function () {

  it('generateId generates a 10 character long string', function () {
    const result = idUtility.generateId();

    return expect(result)
      .to.be.a('string')
      .and.have.lengthOf(10);
  });

  it('validateId returns true if validation succeeds', function () {
    const validId = 'ABcde12345';

    const result = idUtility.validateId(validId);

    return expect(result)
      .to.be.a('boolean')
      .and.equal(true);
  });

  it('validateId returns false if validation fails', function () {
    const validId = 'INVALID ID';

    const result = idUtility.validateId(validId);

    return expect(result)
      .to.be.a('boolean')
      .and.equal(false);
  });

});