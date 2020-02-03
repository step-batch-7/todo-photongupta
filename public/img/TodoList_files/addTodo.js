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

const showDetail = function() {
  const id = event.target.getAttribute('id');
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '0vh';
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let content = JSON.parse(xhr.responseText);
    content = content.filter(todo => todo.id == id).flat();
    console.log(content);
  };
  xhr.open('GET', '/todoList.json', true);
  xhr.send();
};
