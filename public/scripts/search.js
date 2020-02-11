const showFirstMatchDetail = function(requiredTodo) {
  const todoId = requiredTodo[0].getAttribute('id');
  sendXmlHttpRequest('/todoList.json', 'GET', showTodoItems, {todoId});
};

const filterTodo = function(todo) {
  const title = todo.children[0].innerText.toLowerCase();
  return title.includes(this.toLowerCase());
};

const searchTodo = function(todos, input) {
  const requiredTodo = todos.filter(filterTodo.bind(input));
  if (requiredTodo.length) {
    showFirstMatchDetail(requiredTodo);
    requiredTodo.forEach(todo => (todo.style.display = 'flex'));
  }
};

const hasSameId = function(todo) {
  return todo.id === +this.getAttribute('id');
};

const searchItem = function(resText, {todos, input}) {
  const todoList = JSON.parse(resText);
  const requiredTodo = todoList.filter(todo => {
    const requiredItems = todo.todoItems.filter(task =>
      task.item.toLowerCase().includes(input.toLowerCase())
    );
    return requiredItems.length > 0;
  });
  if (requiredTodo.length) {
    const todoInHtml = todos.filter(todo =>
      requiredTodo.some(hasSameId.bind(todo))
    );
    showFirstMatchDetail(todoInHtml);
    todoInHtml.forEach(todo => (todo.style.display = 'flex'));
  }
};

const search = function() {
  const input = document.querySelector('.searchBar');
  const titles = document.getElementsByClassName('showTitle');
  const todos = Array.from(titles);
  todos.forEach(todo => (todo.style.display = 'none'));
  if (isSearchForTodo()) {
    searchTodo(todos, input.value);
  } else {
    sendXmlHttpRequest('/todoList.json', 'GET', searchItem, {
      todos,
      input: input.value
    });
  }
};

const isSearchForTodo = function() {
  return document.querySelector('#searchFor').value == 'todo';
};

const toggleSearchStatus = function() {
  const input = document.querySelector('.searchBar');
  if (isSearchForTodo()) input.placeholder = 'search for todo ...';
  else input.placeholder = 'search for task ...';
};
