const morgan = require('morgan');

const loggerMiddleware = morgan(function (tokens, req, res) {
  const dateTime = new Date().toISOString();
  return [
    `${dateTime}` + ' ',
    tokens.method(req, res), // HTTP method (e.g., GET, POST)
    tokens.url(req, res), // Requested URL
    tokens.status(req, res) + ' -',
    tokens['response-time'](req, res), // Response time in ms
    'ms',
  ].join(' ');
});

module.exports = loggerMiddleware;
