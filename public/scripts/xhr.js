const appendChildTo = function(childInnerHtml, {parent, child}) {
  const parentElement = document.querySelector(parent);
  const template = document.createElement(child);
  template.innerHTML = childInnerHtml;
  parentElement.appendChild(template);
};

const itemsInHtml = function(task) {
  const {item, id, isDone} = task;
  const isChecked = isDone ? 'checked' : '';
  return `
   <div class="item" id="${id}">
       <input type="checkbox" name="isDone" editable="true" class="TickItem" ${isChecked} />
       <p class="task" contenteditable="true" onkeyDown="editTask()">${item}</p>
       <img src="../img/minus.png" class="close" onclick="deleteItem()" />
   </div><br/>`;
};

const todoDetailInHtml = function(resText, todoItems) {
  return `
  <p class="titleHeading">${resText[0].title}</p><br>
  <div id="showItemList">
    <div class="showItems">${todoItems.join('')}</div><br>
    <input name="item" class="input" id="addMoreTask" autocomplete="off" required type="text" onkeydown="addTask(event)" placeholder="tasks..." ></input >
    <img src="../img/plus.png" alt="add" class="icon" onclick="addTask(event)" id="__id__"/><br><br>
    <img src="../img/back.png" class="icon" onclick="removeDetail()">
    <img src="../img/tick.png" class="icon" onclick="updateIsDoneStatus()">
  </div>`;
};

const addInputBox = function(event) {
  if (event.keyCode === 13 || event.target.alt === 'addTodo') {
    const input = `<input name="todoItem"  class="input" autocomplete="off" required type="text"
     onkeydown="addInputBox(event)" placeholder="tasks..." ></input ><br /><br />`;
    appendChildTo(input, {parent: '.list', child: 'li'});
  }
};

const removeInputBox = function() {
  const form = document.querySelector('.list');
  form.removeChild(form.lastChild);
};

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

const updateTodoList = function(resText) {
  document.getElementById('todo').innerHTML = resText;
};

const updateItemList = function(resText, {todoId}) {
  sendXmlHttpRequest('/todoList.json', 'GET', showTodoItems, {todoId});
};

const removeDetail = function() {
  sendXmlHttpRequest('/showList.html', 'GET', updateTodoList);
  const detail = document.querySelector('.todoDetail');
  detail.style.transform = 'scale(0)';
};

const showTodoItems = function(resText, args) {
  const detail = document.querySelector('.todoDetail');
  detail.id = args.todoId;
  detail.style.transform = 'scale(1)';
  const form = document.querySelector('.form');
  form.style.transform = 'scale(0)';
  const todoDetail = JSON.parse(resText)
    .filter(todo => todo.id === +args.todoId)
    .flat();
  const todoItems = todoDetail[0].todoItems.map(task => itemsInHtml(task));
  detail.innerHTML = todoDetailInHtml(todoDetail, todoItems);
};

const showAddForm = function() {
  const todoList = document.querySelector('.todoDetail');
  todoList.style.transform = 'scale(0)';
  const form = document.querySelector('.form');
  form.style.transform = 'scale(1)';
};
