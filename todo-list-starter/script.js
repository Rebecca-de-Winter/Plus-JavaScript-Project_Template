let todoTasks = ["Walk Chilli", "Make Dinner"]; // Array 1 - the list of words you want to show on the page
let todoTasksStatus = [false, true]; // Array 2 - Flags whether a task has been done or not done. eg "Make Dinner" is true therefore has been done.

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
  const newTodoTaskTextElement = document.createElement("p");
  newTodoTaskTextElement.innerText = task;

  if (todoTasksStatus[index] == true) {
    newTodoTaskTextElement.classList.add("complete");
  }

  const newTodoTaskElement = document.createElement("li");
  newTodoTaskElement.appendChild(newTodoTaskTextElement);

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
  if (todoTasksStatus[index] == false) {
    todoTasksStatus[index] = true;
  } else {
    todoTasksStatus[index] = false;
  }
  updateTodoList();
};

updateTodoList();
