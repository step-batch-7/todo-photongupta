const {app} = require('../lib/handler');
const request = require('supertest');

describe('GET /', function() {
  it('test for get request with file path /', function(done) {
    request(app.serve.bind(app))
      .get('/')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html')
      .expect('Content-Length', '216')
      .expect(200, done);
  });
});

describe('GET /bad', function() {
  it('test  for post request with file not existing', function(done) {
    request(app.serve.bind(app))
      .get('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});
