const titles = `
<div class="showTitle" id="__id__" onclick="showDetail(event)">
  __title__
</div><br/>
`;

const todoList = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="scripts/addTodo.js"></script>
    <title>TodoList</title>
  </head>
  <body>
    <div>
      <img
        src="img/close.png"
        alt="close"
        class="close"
        onclick="location.href='index.html'"
      /><br />
      <h1>Todo list</h1>
    </div>
    <div class="todo">
      __todoList__
    </div>
    <div class="todoDetail"></div>
  </body>
</html>
`;
module.exports = {titles, todoList};
