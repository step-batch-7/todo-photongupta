const sendXmlHttpRequest = function(url, method, callback, args, body) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      let todoLists = this.responseText;
      const contentType = this.getResponseHeader('content-type');
      if (contentType === 'application/json; charset=utf-8') {
        todoLists = JSON.parse(todoLists);
      }
      callback(todoLists, args);
    } else {
      alert('something went wrong');
    }
  };

  xhr.open(method, url, true);
  body && xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(body));
};

const showTasks = function() {
  const todoId = event.target.parentElement.id;
  sendXmlHttpRequest('/todoLists', 'GET', showTodoItems, {todoId});
};

const editTitle = function() {
  if (event.keyCode === 13) {
    event.target.blur();
    const newTitle = event.target.innerText;
    const todoId = event.target.parentElement.id;
    const body = {todoId, newTitle};
    sendXmlHttpRequest('/editTitle', 'POST', showTodoLists, null, body);
  }
};

const editTask = function() {
  if (event.keyCode === 13) {
    event.target.blur();
    const newTask = event.target.innerText;
    const taskId = event.target.parentElement.id;
    const todoId = document.querySelector('.todoDetail').getAttribute('id');
    const body = {todoId, newTask, taskId};
    sendXmlHttpRequest('/editTask', 'POST', showTodoItems, {todoId}, body);
  }
};

const addTask = function(event) {
  if (event.keyCode === 13 || event.target.alt === 'add') {
    const detail = document.querySelector('.todoDetail');
    const todoId = detail.getAttribute('id');
    const inputValue = document.querySelector('#addMoreTask').value;
    if (inputValue === '') return;
    const body = {todoId, item: inputValue};
    sendXmlHttpRequest('/addItem', 'POST', showTodoItems, {todoId}, body);
    sendXmlHttpRequest('/todoLists', 'GET', showTodoLists, {todoId});
    document.querySelector('#addMoreTask').focus();
  }
};

const removeDeleteTodoPopUp = function() {
  document.querySelector('.deleteTodoPopUp').style.transform = 'scale(0)';
};

const deleteTodo = function() {
  removeDeleteTodoPopUp();
  const todoId = event.target.parentElement.id;
  const body = {todoId};
  sendXmlHttpRequest('/deleteTodo', 'POST', showTodoLists, null, body);
};

const deleteItem = function() {
  const itemId = event.target.parentElement.id;
  const todoId = document.querySelector('.todoDetail').getAttribute('id');
  const body = {itemId, todoId};
  sendXmlHttpRequest('/deleteItem', 'POST', showTodoItems, {todoId}, body);
  sendXmlHttpRequest('/todoLists', 'GET', showTodoLists, {todoId});
};

const updateIsDoneStatus = function() {
  const taskId = event.target.parentElement.id;
  const todoId = document.querySelector('.todoDetail').id;
  const body = {todoId, taskId};
  sendXmlHttpRequest('/updateStatus', 'POST', showTodoItems, {todoId}, body);
  sendXmlHttpRequest('/todoLists', 'GET', showTodoLists, {todoId});
};

const logoutConfirmation = function() {
  document.querySelector('.popUp').style.transform = 'scale(1)';
  document.body.style = 'pointer-events: none';
  document.querySelector('#button1').style = 'pointer-events: auto';
  document.querySelector('#button2').style = 'pointer-events: auto';
};

const removePopUp = function() {
  document.querySelector('.popUp').style.transform = 'scale(0)';
  document.body.style = 'pointer-events: auto';
};

const logOut = function() {
  removePopUp();
  document.location = '/logout';
};

const main = function() {
  sendXmlHttpRequest('/todoLists', 'GET', showTodoLists);
};

window.onload = main;
