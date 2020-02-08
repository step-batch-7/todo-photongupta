const fs = require('fs');
const request = require('supertest');
const {stringify} = require('querystring');
const {config} = require('../config');
const fakeDataBase = config.path;

const content = JSON.stringify([
  {
    title: 'complete Todo',
    id: 124,
    todoItems: [
      {item: 'write Todo', id: 1, isDone: true},
      {item: 'write Todo', id: 2, isDone: false}
    ]
  },
  {
    title: 'shopping',
    id: 123,
    todoItems: [{item: 'buy shoe', id: 1, isDone: true}]
  }
]);
fs.writeFileSync(fakeDataBase, content, 'utf8');
const {app} = require('../lib/handler');

describe('GET /', function() {
  it('test for get request with file path /', function(done) {
    request(app.serve.bind(app))
      .get('/')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html')
      .expect(200, done);
  });
});

describe('GET /bad', function() {
  it('test  for get request with file not existing', function(done) {
    request(app.serve.bind(app))
      .get('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('GET /showList.html', function() {
  it('test for get request with file path /showList.html', function(done) {
    request(app.serve.bind(app))
      .get('/showList.html')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html')
      .expect(200, done);
  });
});

describe('GET /todoList.json', function() {
  it('test for get request with file path /todoList.json', function(done) {
    request(app.serve.bind(app))
      .get('/todoList.json')
      .set('Accept', '*/*')
      .expect('Content-Type', 'application/json')
      .expect(200, done);
  });
});

describe('POST /addTodo.html', function() {
  it('test  for post request with url /addTodo.html', function(done) {
    request(app.serve.bind(app))
      .post('/addTodo.html')
      .set('Accept', '*/*')
      .send(stringify({title: 'go for break', todoItem: 'drink milk'}))
      .expect('Location', '/index.html')
      .expect(302, done);
  });
});

describe('POST /addItem', function() {
  it('test  for post request with url /addItem', function(done) {
    request(app.serve.bind(app))
      .post('/addItem')
      .send(stringify({todoId: 123, item: 'drink juice'}))
      .set('Accept', '*/*')
      .expect('Location', '/showList.html')
      .expect(302, done);
  });
});

describe('POST /updateStatus', function() {
  it('test  for post request with url /updateStatus', function(done) {
    request(app.serve.bind(app))
      .post('/updateStatus')
      .set('Accept', '*/*')
      .send(stringify({todoId: 124, ids: '1, 2'}))
      .expect('Location', '/showList.html')
      .expect(302, done);
  });
});

describe('POST /deleteTodo', function() {
  it('test  for post request with url /deleteTodo', function(done) {
    request(app.serve.bind(app))
      .post('/deleteTodo')
      .set('Accept', '*/*')
      .send(stringify({todoId: 123}))
      .expect('Location', '/showList.html')
      .expect(302, done);
  });
});

describe('POST /deleteItem', function() {
  it('test  for post request with url /deleteItem', function(done) {
    request(app.serve.bind(app))
      .post('/deleteItem')
      .set('Accept', '*/*')
      .send(stringify({todoId: 124, itemId: 1}))
      .expect('Location', '/showList.html')
      .expect(302, done);
  });
});

describe('POST /bad', function() {
  it('test  for post request with file not existing', function(done) {
    request(app.serve.bind(app))
      .post('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('PUT /', function() {
  it('test for put request', function(done) {
    request(app.serve.bind(app))
      .put('/')
      .set('Accept', '*/*')
      .expect(400, done);
  });
});

after(() => fs.unlinkSync(fakeDataBase));
