console.log("Created by Raunak kaushal ❤");
let addTask = document.querySelector("#addTask");
let pendingTask = document.querySelector("#pendingTask");
let showTask = document.querySelector("#showTask");
let deleteTask = document.querySelector("#deleteTask");
let hr = document.querySelector("hr");

let input = document.querySelector("#input");
let todoData = document.querySelector(".todo-data");

addTask.addEventListener('click', () => { // add a new task
    if (input.value.trim() === "") return;

    todoData.style.display = 'block';
    let newTodo = createTodo();
    todoData.appendChild(newTodo);
    input.value = "";
});

pendingTask.addEventListener('click', () => { // show only pending tasks
    let todos = todoData.querySelectorAll(".list-items");
    todos.forEach(todo => {
        let status = todo.querySelector(".todo-status").textContent;
        if (status === "In progress") {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
            hr.style.display = "none";
        }
    });
});

showTask.addEventListener('click', () => { // show all tasks
    let todos = todoData.querySelectorAll(".list-items");
    todos.forEach(todo => {
        todo.style.display = 'flex';
    });
});

deleteTask.addEventListener('click', () => { // delete all tasks
    todoData.querySelectorAll(".list-items").forEach(item => item.remove());
    if (todoData.querySelectorAll(".list-items").length === 0) {
        todoData.style.display = 'none';
    }
});

function createTodo() { // Function to create a new todo item
    let listItem = document.createElement("div");
    listItem.className = "list-items";

    let todoNumber = document.createElement("div");
    todoNumber.className = "todo-no";
    todoNumber.textContent = getNextTodoNumber();

    let todoMsg = document.createElement("div");
    todoMsg.className = "todo-items";
    todoMsg.textContent = input.value;

    let todoStatus = document.createElement("div");
    todoStatus.className = "todo-status";
    todoStatus.textContent = "In progress";

    let todoAction = document.createElement("div");
    todoAction.className = "todo-action";

    let editTodo = document.createElement("button");
    editTodo.className = "todo-button";
    editTodo.id = "editTodo";
    editTodo.textContent = "Edit";

    let deleteTodo = document.createElement("button");
    deleteTodo.className = "todo-button";
    deleteTodo.id = "deleteTodo";
    deleteTodo.textContent = "Delete";

    let completeTodo = document.createElement("button");
    completeTodo.className = "todo-button";
    completeTodo.id = "completeTodo";
    completeTodo.textContent = "Finish";

    // Edit task 
    editTodo.addEventListener('click', () => {
        let newText = prompt("Edit task:", todoMsg.textContent);
        if (newText !== null) {
            todoMsg.textContent = newText;
            todoStatus.textContent = "In progress";
        }
    });

    // Delete task 
    deleteTodo.addEventListener('click', () => {
        todoData.removeChild(listItem);
        updateTodoNumbers();
        if (todoData.querySelectorAll(".list-items").length === 0) {
            todoData.style.display = 'none';
        }
    });

    // Complete task 
    completeTodo.addEventListener('click', () => {
        todoStatus.textContent = "Completed";
    });

    todoAction.append(editTodo, deleteTodo, completeTodo);
    listItem.append(todoNumber, todoMsg, todoStatus, todoAction);

    return listItem;
}

function getNextTodoNumber() {
    return todoData.querySelectorAll(".list-items").length + 1;
}

function updateTodoNumbers() {
    let todoItems = todoData.querySelectorAll(".list-items");
    todoItems.forEach((item, index) => {
        let todoNo = item.querySelector(".todo-no");
        todoNo.textContent = index + 1;
    });
}