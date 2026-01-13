let todoTasks = ["Walk Chilli", "Make Dinner"]; // Array 1 - list of tasks
let todoTasksStatus = [false, true]; // Array 2 - This means walk chilli is false (not done), make dinner is done.

const todoList = document.getElementById("todo-list"); // this is the list itself

const addTask = () => {
  const newTask = document.getElementById("new-task-text");
  if (newTask.value) {
    todoTasks.push(newTask.value);
    todoTasksStatus.push(false);
    newTask.value = "";
    updateTodoList();
  }
};

const updateTodoList = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  for (const [index, task] of todoTasks.entries()) {
    const newTodoTaskElement = createNewTodoItemElement(task, index);
    todoList.appendChild(newTodoTaskElement);
  }
};

const createNewTodoItemElement = (task, index) => {
  // Create a <p> element to store the task description i.e. "walk chilli". First line creates the paragrapgh, second adds the inner text.
  const newTodoTaskTextElement = document.createElement("p"); // Creates a new paragraph element ("p")
  newTodoTaskTextElement.innerText = task; // Creates text inside <p>

  // Apply a CSS class to the completed items
  if (todoTasksStatus[index] == true) {
    newTodoTaskTextElement.classList.add("complete"); // this is a line through in CSS. Affects TEXT line in above <p>
  }

  //Create a <li> element to contain the paragraph
  const newTodoTaskElement = document.createElement("li"); // Creates new li element
  newTodoTaskElement.appendChild(newTodoTaskTextElement); // Puts the <p> text inside the list item.

  // Adding a button to mark each item as complete
  const completeButtonElement = document.createElement("input");
  completeButtonElement.type = "button";
  completeButtonElement.value = "Completed";
  completeButtonElement.onclick = function () {
    toggleComplete(index);
  };
  newTodoTaskElement.appendChild(completeButtonElement);
  return newTodoTaskElement;
};

const toggleComplete = (index) => {
  // If it is complete, set it to incomplete
  // If it is incomplete, set it to complete
  if (todoTasksStatus[index] == false) {
    todoTasksStatus[index] = true;
  } else {
    todoTasksStatus[index] = false;
  }
  updateTodoList();
};
updateTodoList();
