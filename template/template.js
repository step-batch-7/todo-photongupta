const titles = `
<div class="showTitle"  id="__id__" >
<p class="title"  contenteditable="true" onkeyDown="editTitle()">__title__&nbsp</p>
<p class="">__left__&nbsp</p>
<img src="../img/minus.png" class="close" onclick="deleteTodo()"/>
<img src="../img/edit.png" class="close" onclick="showTasks()"/>

</div>
`;
const todoList = `
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="stylesheet" href="css/style.css" />
    <script src="./scripts/xhr.js"></script>
    <title>TodoList</title>
  </head>
  <body id="todo">
    <div class="header">
      <h4 class="headLine">Todos</h4>
      <div class="menuBar">
        <input
          type="text"
          placeholder="search for task..."
          class="searchBar"
          oninput="search()"
        />
  
        <select id="searchFor" onchange="toggleSearchStatus()">
  <option value="task">task</option>
  <option value="todo">todo</option>
</select>

        <img src="img/plus.png" class="icon" onclick="showAddForm()" />
        <img
          src="img/home.png"
          class="icon"
          onclick="location.href='index.html'"
        />
      </div>
    </div>

    <hr />

    <div class="todoHistory">
      <div class="todo">
        <h2>Your todos...</h2>
        __todoList__
      </div>
      <div class="right">
        <div class="todoDetail"></div>

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
                <li>
                  <input
                    name="todoItem"
                    class="input"
                    autocomplete="off"
                    required
                    type="text"
                    onkeydown="addInputBox(event)"
                    placeholder="tasks..."
                  /><br /><br />
                </li>
              </ul>
              <br />
            </div>
            <img
              src="img/back.png"
              class="icon"
              onclick="location.href='showList.html'"
            />
            <img
              src="img/plus.png"
              class="icon"
              onclick="addInputBox(event)"
              alt="addTodo"
            />
            <img src="img/minus.png" class="icon" onclick="removeInputBox()" />
            <input type="image" class="icon" src="img/tick.png" />
          </form>
        </div>
      </div>
    </div>
  </body>
</html>
`;

module.exports = {todoList, titles};
