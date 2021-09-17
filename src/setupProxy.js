const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/register',
    createProxyMiddleware({
      target: 'http://sensor-relay.int.mindphaser.se',
      changeOrigin: true
    }),
  );
  app.use(
    '/ws',
    createProxyMiddleware({
      target: 'http://http://sensor-relay.int.mindphaser.se',
      changeOrigin: true,
      ws: true
    }),
  );
};