'use strict';

const http = require('http');
const {app} = require('./lib/routes');
const defaultPort = 5000;

const main = function(port = defaultPort) {
  const server = http.createServer();
  server.on('request', (req, res) => app.serve(req, res));
  server.listen(port, () =>
    process.stdout.write('server is listing', server.address())
  );
};

main();
