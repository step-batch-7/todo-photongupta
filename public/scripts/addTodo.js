const itemsInHtml = function(task) {
  const {item, id, isDone} = task;
  const isChecked = isDone ? 'checked' : '';
  return `
   <div class="showItems">
       <input type="checkbox" name="isDone" class="editItem" ${isChecked} id="${id}" />
       ${item}
       <img src="../img/deleteIcon.png" class="delete" onclick="deleteItem()" id="${id}"/>
   </div><br/>`;
};

const addItems = function() {
  const form = document.querySelector('.items');
  const textarea = document.createElement('textarea');
  textarea.cols = '50';
  textarea.rows = '3';
  textarea.required = true;
  textarea.name = 'todoItem';
  form.appendChild(textarea);
  const br = document.createElement('br');
  form.appendChild(br);
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
      callback(JSON.parse(this.responseText), args);
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

const deleteItem = function() {
  const ItemId = event.target.getAttribute('id');
  let todoId = document.querySelector('.todoDetail').getAttribute('id');
  const body = `itemId=${ItemId}&todoId=${todoId}`;
  postXmlHttpRequest('/deleteItem', body, testing, {todoId});
};
const testing = function({todoId}) {
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '0vh';
  detail.id = todoId;
  getXmlHttpRequest('/todoList.json', showTodoItems, {todoId, detail});
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
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '-100vh';
};

const showDetail = function() {
  const todoId = event.target.getAttribute('id');
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '0vh';
  detail.id = todoId;
  getXmlHttpRequest('/todoList.json', showTodoItems, {todoId, detail});
};

const showTodoItems = function(resText, args) {
  resText = resText.filter(todo => todo.id == args.todoId).flat();
  const todoItems = resText[0].todoItems.map(task => itemsInHtml(task));
  args.detail.innerHTML = `
    <div class="todo">
      <h1 class="titleHeading">${resText[0].title}</h1>${todoItems.join('')}
      <button type="submit" onclick="updateIsDoneStatus()">save</button>
    </div>
    `;
};
