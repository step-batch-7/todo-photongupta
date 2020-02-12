const json = require('./mimeTypes').CONTENT_TYPES.json;

const sendResponse = function(data) {
  this.setHeader('Content-Type', json);
  this.end(data);
};

const matchHeaders = function(route, req) {
  if (route.method) {
    return route.method === req.method && req.url.match(route.path);
  }
  return true;
};

class App {
  constructor() {
    this.routes = [];
  }

  get(path, handler) {
    this.routes.push({path, handler, method: 'GET'});
  }

  post(path, handler) {
    this.routes.push({path, handler, method: 'POST'});
  }

  serve(req, res) {
    res.sendResponse = sendResponse;
    const matchingHandlers = this.routes.filter(route =>
      matchHeaders(route, req)
    );

    const next = function() {
      const route = matchingHandlers.shift();
      route && route.handler(req, res, next);
    };
    next();
  }

  use(handler) {
    this.routes.push({handler});
  }
}

module.exports = App;
