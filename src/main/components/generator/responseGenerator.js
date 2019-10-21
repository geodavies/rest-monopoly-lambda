'use strict';

const generateSuccessResponse = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
};

const generateFailureResponse = (statusCode, reason) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify({
      reason: reason
    })
  };
};

module.exports = {
  generateSuccessResponse,
  generateFailureResponse
};