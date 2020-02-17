const request = require('supertest');
const {app} = require('../lib/routes');

describe.only('GET /', function() {
  it('should give the index.html page when the url is /', function(done) {
    request(app)
      .get('/')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=123')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });

  it('should give 404 when the url is not existing', function(done) {
    request(app)
      .get('/bad')
      .set('Accept', '*/*')
      .expect(404, done);
  });

  it('should give the home.html when the url is /home.html', function(done) {
    request(app)
      .get('/home.html')
      .set('Accept', '*/*')
      .expect('Content-Type', 'text/html; charset=UTF-8')
      .expect(200, done);
  });

  it('should give all the todo when the url is /todoList.json', function(done) {
    request(app)
      .get('/todoList.json')
      .set('Accept', '*/*')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

describe('POST ', function() {
  it('should add the todo when the url /addTodo.html', function(done) {
    request(app)
      .post('/home.html')
      .set('Accept', '*/*')
      .send(stringify({title: 'go for break', todoItem: 'drink milk'}))
      .expect('Location', '/home.html')
      .expect(302, done);
  });

  it('should add the item when the url /addItem', function(done) {
    request(app)
      .post('/addItem')
      .send(JSON.stringify({todoId: 123, item: 'drink juice'}))
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .expect(200, done);
  });

  it('should update the status when the url is /updateStatus', function(done) {
    request(app)
      .post('/updateStatus')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, taskId: 1}))
      .expect(200, done);
  });

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
