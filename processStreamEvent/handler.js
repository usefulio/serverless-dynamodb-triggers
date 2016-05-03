'use strict';

const util = require('util');

module.exports.handler = function(event, context, cb) {
  console.log(util.inspect(event.dynamodb, false, null));
  return cb(null, {
    message: 'Go Serverless DynamoDB Streams! Your Lambda function executed successfully! Actually you do not need to return anything for an event-based Lambda.'
  });
};
