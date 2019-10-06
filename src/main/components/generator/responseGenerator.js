'use strict';

const generateSuccessResponse = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
};

const generateFailureResponse = (statusCode, reason) => {
  let response;
  if (typeof reason === "undefined") {
    response = {
      statusCode: statusCode
    }
  } else {
    response = {
      statusCode: statusCode,
      body: JSON.stringify({
        reason: reason
      })
    }
  }
  return response;
};

module.exports = {
  generateSuccessResponse,
  generateFailureResponse
};