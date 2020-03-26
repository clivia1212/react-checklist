
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(createProxyMiddleware('/work-items', { target: 'http://localhost:3001/' }));
};