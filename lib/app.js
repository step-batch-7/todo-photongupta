const json = require('./mimeTypes').CONTENT_TYPES.json;

const sendResponse = function(data) {
  this.setHeader('Content-Type', json);
  this.end(data);
};

class App {
  constructor() {
    this.allRoutes = [];
  }

  insertIntoRouteChain(method, path, handlers) {
    const routes = handlers.map(handler => ({path, handler, method}));
    this.allRoutes.push(...routes);
  }
  get(path, ...handlers) {
    this.insertIntoRouteChain('GET', path, handlers);
  }

  post(path, ...handlers) {
    this.insertIntoRouteChain('POST', path, handlers);
  }

  use(...handlers) {
    this.insertIntoRouteChain(null, null, handlers);
  }

  serve(req, res) {
    const matchesRequest = function({method, path}) {
      return !method || (req.method === method && req.url.match(path));
    };
    const routes = this.allRoutes.filter(matchesRequest);
    const handlers = routes.map(route => route.handler);
    res.sendResponse = sendResponse;
    const next = function() {
      const handler = handlers.shift();
      handler && handler(req, res, next);
    };
    next();
  }
}

module.exports = App;
