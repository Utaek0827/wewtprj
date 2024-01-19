const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use('/api',
    createProxyMiddleware({
      // target: 'https://utapi.duckdns.org',

      // target: 'http://uutt77.duckdns.org:10030',
      // target: 'http://utimg.duckdns.org/',
      target: 'http://localhost:8081/',


      changeOrigin: true,
    }),
  );

  app.use('/auth',
    createProxyMiddleware({
      // target: 'https://utapi.duckdns.org',

      // target: 'http://uutt77.duckdns.org:10030',
      target: 'http://localhost:8081/',

      changeOrigin: true,
    }),
  );
  
};