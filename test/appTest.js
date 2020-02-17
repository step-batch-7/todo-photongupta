const request = require('supertest');
const {fake} = require('sinon');
const {app} = require('../lib/routes');
const TodoStore = require('../lib/todoStore');
const UserStore = require('../lib/userStore');
const SessionManager = require('../lib/sessionManger');

describe('GET /', function() {
  let writer;
  beforeEach(() => {
    writer = fake();
    const todoLists = {
      anu: [
        {
          title: 'asdfasd',
          id: 3,
          todoItems: [
            {id: 1, isDone: false, item: 'asdf'},
            {id: 2, isDone: false, item: 'asd'}
          ]
        },
        {
          title: 'sdf',
          id: 4,
          todoItems: [{id: 1, isDone: false, item: 'dsf'}]
        }
      ]
    };

    const userCredentials = {
      anu: {password: '123', email: 'a@a', phone: '1234567890'}
    };

    const sessionStore = new SessionManager(0);
    sessionStore.createNewSession('anu');

    app.locals = {
      todoStore: TodoStore.initialize(todoLists, '', writer),
      sessionStore,
      userStore: UserStore.initialize(userCredentials, '', writer)
    };
  });

  it('should give the index.html page when the url is /', function(done) {
    request(app)
      .get('/')
      .set('Accept', '*/*')
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
      .set('Cookie', 'sessionId=1')
      .expect('Content-Type', /text\/html/)
      .expect(200, done);
  });

  it('should give all the todo when the url is /todoList.json', function(done) {
    request(app)
      .get('/todoList.json')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });
});

// eslint-disable-next-line max-statements
describe('POST ', function() {
  let writer;
  beforeEach(() => {
    writer = fake();
    const todoLists = {
      anu: [
        {
          title: 'asdfasd',
          id: 3,
          todoItems: [
            {id: 1, isDone: false, item: 'asdf'},
            {id: 2, isDone: false, item: 'asd'}
          ]
        },
        {
          title: 'sdf',
          id: 4,
          todoItems: [{id: 1, isDone: false, item: 'dsf'}]
        }
      ]
    };

    const userCredentials = {
      anu: {password: '123', email: 'a@a', phone: '1234567890'}
    };

    const sessionStore = new SessionManager(0);
    sessionStore.createNewSession('anu');

    app.locals = {
      todoStore: TodoStore.initialize(todoLists, '', writer),
      sessionStore,
      userStore: UserStore.initialize(userCredentials, '', writer)
    };
  });
  it('should add the todo when the url /addTodo.html', function(done) {
    request(app)
      .post('/home.html')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .send(JSON.stringify({title: 'go for break', todoItem: 'drink milk'}))
      .expect('Location', '/home.html')
      .expect(302, done);
  });

  it('should add the item when the url /addItem', function(done) {
    request(app)
      .post('/addItem')
      .set('Cookie', 'sessionId=1')
      .send(JSON.stringify({todoId: 123, item: 'drink juice'}))
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .expect(200, done);
  });

  it('should update the status when the url is /updateStatus', function(done) {
    request(app)
      .post('/updateStatus')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, taskId: 1}))
      .expect(200, done);
  });

  it('test  for post request with url /updateStatus', function(done) {
    request(app)
      .post('/updateStatus')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .set('Accept', '*/*')
      .send(JSON.stringify({todoId: 124, taskId: 90}))
      .expect(200, done);
  });

  it('test  for post request with url /deleteTodo', function(done) {
    request(app)
      .post('/deleteTodo')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 123}))
      .expect(200, done);
  });

  it('test  for post request with url /deleteItem', function(done) {
    request(app)
      .post('/deleteItem')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, itemId: 1}))
      .expect(200, done);
  });

  it('test  for post request with url /editTask', function(done) {
    request(app)
      .post('/editTask')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, newTask: 'go to home', taskId: 2}))
      .expect(200, done);
  });

  it('test  for post request with url /editTitle', function(done) {
    request(app)
      .post('/editTitle')
      .set('Accept', '*/*')
      .set('Cookie', 'sessionId=1')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({todoId: 124, newTitle: 'market'}))
      .expect(200, done);
  });
  it('test  for post request with file not existing', function(done) {
    request(app)
      .post('/notFound')
      .set('Accept', '*/*')
      .expect(404, done);
  });

  it('test for post request for editTitle with wrong args', function(done) {
    request(app)
      .post('/editTitle')
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json')
      .send(JSON.stringify({id: 124, title: 'market'}))
      .expect(400, done);
  });
});
