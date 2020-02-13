'use strict';

const {app} = require('./lib/routes');

const defaultPort = 5000;

const main = function(port = defaultPort) {
  app.listen(port);
};

main();
