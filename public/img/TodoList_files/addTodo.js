const items = `
<div class="showItems" >
<p class="tick"><input type="checkbox" name="isDone" id="" /> __item__</p>
</div><br/>
`;

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
  const id = event.target.getAttribute('id');
  console.log(id);
};

const showDetail = function() {
  const id = event.target.getAttribute('id');
  const detail = document.querySelector('.todoDetail');
  detail.style['margin-top'] = '0vh';
  let xhr = new XMLHttpRequest();
  xhr.onload = function() {
    let content = JSON.parse(xhr.responseText);
    content = content.filter(todo => todo.id == id).flat();
    const todoItems = content[0].todoItems
      .map(task => items.replace('__item__', task.item))
      .join('');
    detail.innerHTML = `
    <div class="todo">
      <h1>${content[0].title}</h1>
      <form method="POST">
      ${todoItems}
        <button type="submit" onclick="toggleStatus()">save</button>
    </form>
    </div>
    `;
  };
  xhr.open('GET', '/todoList.json', true);
  xhr.send();
};
