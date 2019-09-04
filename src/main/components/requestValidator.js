'use strict';

const validateJson = require('jsonschema').validate;

module.exports.validate = (body, schema) => {
  return Promise.resolve(body)
    .then(parseJSON)
    .then(body => validateRequestJSON(body, schema));
};

const parseJSON = body => {
  try {
    return JSON.parse(body);
  } catch {
    throw {
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Failed to parse request JSON'
      })
    }
  }
};

function validateRequestJSON(body, schema) {
  if (validateJson(body, schema).errors.length > 0) {
    throw {
      statusCode: 400,
      body: JSON.stringify({
        reason: 'Body failed schema validation'
      })
    }
  } else {
    return body;
  }
}
