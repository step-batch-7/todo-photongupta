const itemsInHtml = function(task) {
  const {item, id, isDone} = task;
  const isChecked = isDone ? 'checked' : '';
  return `
   <div class="showItems" >
     <p class="tick">
       <input type="checkbox" name="isDone" ${isChecked} id="${id}" />${item}
     </p> 
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

const toggleStatus = function() {
  let checkboxes = document.getElementsByTagName('input');
  let todoId = document.querySelector('.todoDetail').getAttribute('id');
  checkedBoxes = [...checkboxes].filter(checkbox => checkbox.checked);
  ids = checkedBoxes.map(box => box.getAttribute('id'));
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {};
  xhr.open('POST', '/showList.html', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(`ids=${ids}&todoId=${todoId}`);
};

const showDetail = function() {
  const id = event.target.getAttribute('id');
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '0vh';
  detail.id = id;
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let responseText = JSON.parse(xhr.responseText);
    handleResponse(responseText, id, detail);
  };
  xhr.open('GET', '/todoList.json', true);
  xhr.send();
};

const handleResponse = function(resText, id, detail) {
  resText = resText.filter(todo => todo.id == id).flat();
  const todoItems = resText[0].todoItems
    .map(task => itemsInHtml(task))
    .join('');
  detail.innerHTML = `
    <div class="todo">
      <h1>${resText[0].title}</h1>${todoItems}
      <button type="submit" onclick="toggleStatus()">save</button>
    </div>
    `;
};
