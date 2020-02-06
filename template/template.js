const titles = `
<div class="showTitle">
 <p class="title">__title__</p>
  <div class="icons">
   <span ><img src="../img/deleteIcon.png" class="deleteTodo" onclick="deleteTodo()" id="__id__"/>
    <img src="../img/showDetail.png" class="detailIcon" onclick="showDetail(event)" id="__id__"/>
   </span>
   <p class="leftTime">__left__</p>
  </div>
</div>
<br/>
`;

const todoList = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="./scripts/addTodo.js"></script>
    <title>TodoList</title>
  </head>
  <body id="todo">
    <div >
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
