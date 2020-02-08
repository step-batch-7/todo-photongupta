const titles = `
<div class="showTitle">
 <p class="title">__title__</p>
  <div class="icons">
   <span >
    <img src="../img/list.png" class="detailIcon" onclick="showDetail(event)" id="__id__"/>
    <img src="../img/deleteIcon.png" class="deleteTodo" onclick="deleteTodo()" id="__id__"/>
   </span>
   <p class="leftTime">__left__</p>
  </div>
</div>
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
  <div class="header">
  <h4 class="headLine">Todos</h4>
  <div class="menuBar">
    <input
      type="text"
      placeholder="Search here..."
      class="searchBar"
      oninput="searchTodo()"
    />
    <img src="img/search.png" class="icon" onclick="showSearchBar()"/>
    <img src="img/plus.png" class="icon" onclick="showAddForm()"/>
    <img src="img/home.png" class="icon" onclick="location.href='index.html'" />
    <img src="img/menu.png" class="icon" />

  </div>

</div>

<hr />
        
<div class="form">
<form method="POST">
    <p for="Add your todo">Add Your Todo</p>
    <br />
  <input
    type="text"
    name="title"
    required
    autocomplete="off"
    class="input"
    placeholder="add title here..."
  /><br /><br />
  <p for="todoItem">Tasks</p>
  <div class="items">
  <ul class="list">
  <li >
    <input
      name="todoItem"
      class="input"
      autocomplete="off"
      required
      type="text"
      onkeydown="addItems(event)"
      placeholder="tasks..."
    ><br /><br />
    </li>
    </ul><br />
  </div>
  <img src="img/back.png" class="icon" onclick="location.href='showList.html'" />
  <img src="img/plus.png" class="icon" onclick="addItems(event)" alt="addTodo"/>
  <img src="img/minus.png" class="icon" onclick="removeItems()" />
  <input type="image" class="icon" src="img/tick.png"/>

</form>
</div>
    <div class="todo">
      __todoList__
    </div>
    <div class="todoDetail"></div>
  </body>
</html>
`;
module.exports = {titles, todoList};
