const itemsInHtml = function(task) {
  const {item, id, isDone} = task;
  const isChecked = isDone ? 'checked' : '';
  return `
   <div class="showItems">
       <input type="checkbox" name="isDone" class="TickItem" ${isChecked} id="${id}" />
       <p>${item}</p>
       <img src="../img/deleteIcon.png" class="delete" onclick="deleteItem()" id="${id}"/>
   </div><br/>`;
};

const addItems = function(event) {
  if (event.keyCode == 13) {
    const form = document.querySelector('.items');
    const input = document.createElement('input');
    input.classList = 'input';
    input.required = true;
    input.name = 'todoItem';
    input.addEventListener('keydown', addItems);
    form.appendChild(input);
    const br = document.createElement('br');
    form.appendChild(br);
  }
};

const removeItems = function() {
  const form = document.querySelector('.items');
  form.removeChild(form.lastChild);
  form.removeChild(form.lastChild);
};

const getXmlHttpRequest = function(url, callback, args) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      callback(this.responseText, args);
    }
  };
  xhr.open('GET', url, true);
  xhr.send();
};

const postXmlHttpRequest = function(url, body, callback, args) {
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    if (this.status === 200) {
      callback(args);
    }
  };
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(body);
};

const deleteTodo = function() {
  const todoId = event.target.getAttribute('id');
  const body = `todoId=${todoId}`;
  postXmlHttpRequest('/deleteTodo', body, requestForScreenContent, {
    url: '/showList.html',
    callback: renderScreen
  });
};

const requestForScreenContent = function(args) {
  getXmlHttpRequest(args.url, args.callback);
};

const renderScreen = function(resText) {
  document.getElementById('todo').innerHTML = resText;
};

const deleteItem = function() {
  const ItemId = event.target.getAttribute('id');
  let todoId = document.querySelector('.todoDetail').getAttribute('id');
  const body = `itemId=${ItemId}&todoId=${todoId}`;
  postXmlHttpRequest('/deleteItem', body, updateDetail, {todoId});
};
const updateDetail = function({todoId}) {
  getXmlHttpRequest('/todoList.json', showTodoItems, {todoId});
};

const updateIsDoneStatus = function() {
  let checkboxes = document.getElementsByTagName('input');
  let todoId = document.querySelector('.todoDetail').getAttribute('id');
  checkedBoxes = [...checkboxes].filter(checkbox => checkbox.checked);
  ids = checkedBoxes.map(box => box.getAttribute('id'));
  const body = `ids=${ids}&todoId=${todoId}`;
  postXmlHttpRequest('/updateStatus', body, removeDetail);
};

const removeDetail = function() {
  getXmlHttpRequest('/showList.html', renderScreen);
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '-100vh';
};

const showDetail = function() {
  const todoId = event.target.getAttribute('id');
  getXmlHttpRequest('/todoList.json', showTodoItems, {todoId});
};

const showTodoItems = function(resText, args) {
  const detail = document.querySelector('.todoDetail');
  detail.id = args.todoId;
  detail.style['margin-top'] = '0vh';
  resText = JSON.parse(resText)
    .filter(todo => todo.id == args.todoId)
    .flat();
  const todoItems = resText[0].todoItems.map(task => itemsInHtml(task));
  detail.innerHTML = `
    <div class="item">
      <h1 class="titleHeading">${resText[0].title}</h1>${todoItems.join('')}
      <button type="submit" class="add" onclick="updateIsDoneStatus()">Save changes</button>
    </div>
    `;
};
