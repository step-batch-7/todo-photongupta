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
const {app} = require('../lib/routes');

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

describe('GET /home.html', function() {
  it('test for get request with file path /home.html', function(done) {
    request(app.serve.bind(app))
      .get('/home.html')
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
      .post('/home.html')
      .set('Accept', '*/*')
      .send(stringify({title: 'go for break', todoItem: 'drink milk'}))
      .expect('Location', '/home.html')
      .expect(302, done);
  });
});

describe('POST /addItem', function() {
  it('test  for post request with url /addItem', function(done) {
    request(app.serve.bind(app))
      .post('/addItem')
      .send(JSON.stringify({todoId: 123, item: 'drink juice'}))
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .expect(200, done);
  });
});

describe('POST /updateStatus', function() {
  it('test  for post request with url /updateStatus', function(done) {
    request(app.serve.bind(app))
      .post('/updateStatus')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, ids: ['1', '2']}))
      .expect(200, done);
  });
});

describe('POST /deleteTodo', function() {
  it('test  for post request with url /deleteTodo', function(done) {
    request(app.serve.bind(app))
      .post('/deleteTodo')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 123}))
      .expect(200, done);
  });
});

describe('POST /deleteItem', function() {
  it('test  for post request with url /deleteItem', function(done) {
    request(app.serve.bind(app))
      .post('/deleteItem')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, itemId: 1}))
      .expect(200, done);
  });
});

describe('PUT /', function() {
  it('test for put request', function(done) {
    request(app.serve.bind(app))
      .put('/')
      .set('Accept', '*/*')
      .expect(405, done);
  });
});

after(() => fs.unlinkSync(fakeDataBase));
