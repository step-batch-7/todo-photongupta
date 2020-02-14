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
      {item: 'write Todo', id: 2, isDone: true}
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
    request(app)
      .get('/')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });
});

describe('GET /bad', function() {
  it('test  for get request with file not existing', function(done) {
    request(app)
      .get('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('GET /home.html', function() {
  it('test for get request with file path /home.html', function(done) {
    request(app)
      .get('/home.html')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });
});

describe('GET /todoList.json', function() {
  it('test for get request with file path /todoList.json', function(done) {
    request(app)
      .get('/todoList.json')
      .set('Accept', '*/*')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST /addTodo.html', function() {
  it('test  for post request with url /addTodo.html', function(done) {
    request(app)
      .post('/home.html')
      .set('Accept', '*/*')
      .send(stringify({title: 'go for break', todoItem: 'drink milk'}))
      .expect('Location', '/home.html')
      .expect(302, done);
  });
});

describe('POST /addItem', function() {
  it('test  for post request with url /addItem', function(done) {
    request(app)
      .post('/addItem')
      .send(JSON.stringify({todoId: 123, item: 'drink juice'}))
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .expect(200, done);
  });
});

describe('POST /updateStatus', function() {
  it('test  for post request with url /updateStatus', function(done) {
    request(app)
      .post('/updateStatus')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, taskId: 1}))
      .expect(200, done);
  });
});

describe('POST /updateStatus', function() {
  it('test  for post request with url /updateStatus', function(done) {
    request(app)
      .post('/updateStatus')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, taskId: 90}))
      .expect(200, done);
  });
});

describe('POST /deleteTodo', function() {
  it('test  for post request with url /deleteTodo', function(done) {
    request(app)
      .post('/deleteTodo')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 123}))
      .expect(200, done);
  });
});

describe('POST /deleteItem', function() {
  it('test  for post request with url /deleteItem', function(done) {
    request(app)
      .post('/deleteItem')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, itemId: 1}))
      .expect(200, done);
  });
});

describe('POST /editTask', function() {
  it('test  for post request with url /editTask', function(done) {
    request(app)
      .post('/editTask')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, newTask: 'go to home', taskId: 2}))
      .expect(200, done);
  });
});

describe('POST /editTitle', function() {
  it('test  for post request with url /editTitle', function(done) {
    request(app)
      .post('/editTitle')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, newTitle: 'market'}))
      .expect(200, done);
  });
});

describe('POST /notFound', function() {
  it('test  for post request with file not existing', function(done) {
    request(app)
      .post('/notFound')
      .set('Accept', '*/*')
      .expect(404, done);
  });
});

describe('POST /badRequest', function() {
  it('test for post request for editTitle with wrong args', function(done) {
    request(app)
      .post('/editTitle')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({id: 124, title: 'market'}))
      .expect(400, done);
  });
});

after(() => fs.unlinkSync(fakeDataBase));
