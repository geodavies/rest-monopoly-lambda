'use strict';

module.exports.generateSuccessResponse = (body) => {
  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
};

module.exports.generateFailureResponse = (statusCode, reason) => {
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
