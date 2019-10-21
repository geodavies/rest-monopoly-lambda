'use strict';

const validateJson = require('jsonschema').validate;

const validate = (body, requestType) => {
  return Promise.resolve(body)
    .then(parseJSON)
    .then(parsedJson => validateRequestJSON(parsedJson, requestType));
};

function parseJSON(body) {
  try {
    return JSON.parse(body);
  } catch (e) {
    throw Error('Failed to parse request JSON');
  }
}

function validateRequestJSON(body, requestType) {
  if (validateJson(body, require(`../../resources/schema/${requestType}`)).errors.length > 0) {
    throw Error('Body failed schema validation');
  } else {
    return body;
  }
}

module.exports = {
  validate
};
