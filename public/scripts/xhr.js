const sendXmlHttpRequest = function(url, method, callback, args, body) {
  const xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      callback(this.responseText, args);
    }
  };
  xhr.open(method, url, true);
  xhr.send(body);
};

const showTasks = function() {
  const todoId = event.target.parentElement.id;
  sendXmlHttpRequest('/todoList.json', 'GET', showTodoItems, {todoId});
};

const editTitle = function() {
  if (event.keyCode == 13) {
    event.target.blur();
    const newTitle = event.target.innerText;
    const todoId = event.target.parentElement.id;
    const body = `todoId=${todoId}&newTitle=${newTitle}`;
    sendXmlHttpRequest(
      '/editTitle',
      'POST',
      requestForScreenContent,
      {
        url: '/showList.html',
        callback: updateTodoList
      },
      body
    );
  }
};

const editTask = function() {
  if (event.keyCode == 13) {
    event.target.blur();
    const newTask = event.target.innerText;
    const taskId = event.target.parentElement.id;
    const todoId = document.querySelector('.todoDetail').getAttribute('id');
    const body = `taskId=${taskId}&newTask=${newTask}&todoId=${todoId}`;
    sendXmlHttpRequest('/editTask', 'POST', showTodoItems, {todoId}, body);
  }
};

const addTask = function(event) {
  if (event.keyCode === 13 || event.target.alt === 'add') {
    const detail = document.querySelector('.todoDetail');
    const todoId = detail.getAttribute('id');
    const inputValue = document.querySelector('#addMoreTask').value;
    if (inputValue === '') return;
    const body = `todoId=${todoId}&item=${inputValue}`;
    sendXmlHttpRequest('/addItem', 'POST', updateItemList, {todoId}, body);
  }
};

const deleteTodo = function() {
  const todoId = event.target.parentElement.id;
  const body = `todoId=${todoId}`;
  sendXmlHttpRequest(
    '/deleteTodo',
    'POST',
    requestForScreenContent,
    {
      url: '/showList.html',
      callback: updateTodoList
    },
    body
  );
};

const deleteItem = function() {
  const ItemId = event.target.parentElement.id;
  const todoId = document.querySelector('.todoDetail').getAttribute('id');
  const body = `itemId=${ItemId}&todoId=${todoId}`;
  sendXmlHttpRequest('/deleteItem', 'POST', updateItemList, {todoId}, body);
};

const updateIsDoneStatus = function() {
  const checkboxes = document.getElementsByTagName('input');
  const todoId = document.querySelector('.todoDetail').getAttribute('id');
  const checkedItem = [...checkboxes].filter(checkbox => checkbox.checked);
  const ids = checkedItem.map(box => box.parentElement.id);
  const body = `ids=${ids}&todoId=${todoId}`;
  sendXmlHttpRequest('/updateStatus', 'POST', removeDetail, null, body);
};

const requestForScreenContent = function(args) {
  sendXmlHttpRequest(args.url, 'GET', args.callback);
};

const updateItemList = function(resText, {todoId}) {
  sendXmlHttpRequest('/todoList.json', 'GET', showTodoItems, {todoId});
};

const removeDetail = function() {
  sendXmlHttpRequest('/showList.html', 'GET', updateTodoList);
  const detail = document.querySelector('.todoDetail');
  detail.style.transform = 'scale(0)';
};
