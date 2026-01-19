let todoTasks = [
  //everytime you make a new extension, add it here
  {
    task: "Walk Chilli",
    completedTask: false,
    important: false, // means it has no star
    due: "2026-01-19", // adds date
    category: "exercise", // colour category for tasks
  },
  {
    task: "Make dinner",
    completedTask: true,
    important: false,
    due: "2026-01-21",
    category: "home",
  },
];

//let todoTasks = ["Walk Chilli", "Make Dinner"]; // Array 1 - list of tasks
//let todoTasksStatus = [false, true]; // Array 2 - This means walk chilli is false (not done), make dinner is done. Come back to dictionary.

const todoList = document.getElementById("todo-list"); // this is the list itself

const addTask = () => {
  const newTask = document.getElementById("new-task-text");
  const newDue = document.getElementById("new-task-due"); // reference new ID from due date html.
  const newCategory = document.getElementById("new-task-category");

  if (newTask.value) {
    // if there is a value within the NewTask variable aka if someone writes something... then continue with the function.
    todoTasks.push({
      task: newTask.value,
      completedTask: false,
      important: false, // add each new extension here - each on a new line
      due: newDue.value, // referenced  from ID above (duplicate of task)
      category: newCategory.value, // chosen by user, referenced from ID above
    }); // add to end of list.

    // todoTasksStatus.push(false); // add but give the value of false (not done)
    newTask.value = ""; // resets input to have nothing after uploading (empty string).
    newDue.value = ""; //resets date to have nothing after uploading (empty string)
    newCategory.value = "home"; // resets dropdown to be cleared after selection
    updateTodoList();
  }
};

const updateTodoList = () => {
  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = ""; // clearing existing inner html (not innertext because we have many list items, not just the inner text of an input). Rids of children of ul.
  for (const [index, todoTask] of todoTasks.entries()) {
    // gets index and strings of index together. Other way is to use for loop.
    // built in function of arrays?? Check vs dictionaries.
    const newTodoTaskElement = createNewTodoItemElement(todoTask, index); // for every element add to variable newtodotaskelement.
    todoList.appendChild(newTodoTaskElement);
  }
};

const createNewTodoItemElement = (todoTask, index) => {
  const newTodoTaskElement = document.createElement("li");
  newTodoTaskElement.classList.add(`category-${todoTask.category}`);

  // ---- LEFT SIDE (task + due date) ----
  const left = document.createElement("div");
  left.classList.add("left");

  const newTodoTaskTextElement = document.createElement("p");
  newTodoTaskTextElement.innerText = todoTask.task;

  if (todoTask.completedTask === true) {
    newTodoTaskTextElement.classList.add("complete");
  }

  if (todoTask.important === true) {
    newTodoTaskTextElement.classList.add("important");
  }

  const dueInput = document.createElement("input");
  dueInput.type = "date";
  dueInput.value = todoTask.due || "";
  dueInput.onchange = function () {
    todoTasks[index].due = dueInput.value;
    updateTodoList();
  };

  left.appendChild(newTodoTaskTextElement);
  left.appendChild(dueInput);

  // ---- RIGHT SIDE (buttons + category) ----
  const right = document.createElement("div");
  right.classList.add("right");

  const completeButtonElement = document.createElement("input");
  completeButtonElement.type = "button";
  completeButtonElement.value = todoTask.completedTask ? "Undo" : "Done";
  completeButtonElement.classList.add(todoTask.completedTask ? "undo" : "done");

  completeButtonElement.onclick = function () {
    toggleComplete(index);
  };

  const importantButtonElement = document.createElement("input");
  importantButtonElement.type = "button";
  importantButtonElement.value = todoTask.important ? "★" : "☆";
  importantButtonElement.classList.add("star-button");
  importantButtonElement.onclick = function () {
    toggleImportant(index);
  };

  const upButton = document.createElement("input");
  upButton.type = "button";
  upButton.value = "↑";
  upButton.onclick = function () {
    moveUp(index);
  };

  const downButton = document.createElement("input");
  downButton.type = "button";
  downButton.value = "↓";
  downButton.onclick = function () {
    moveDown(index);
  };

  // Disable arrows when they can't move
  if (index === 0) upButton.disabled = true;
  if (index === todoTasks.length - 1) downButton.disabled = true;

  const categorySelect = document.createElement("select");
  categorySelect.innerHTML = `
    <option value="home">Home</option>
    <option value="study">Study</option>
    <option value="exercise">Exercise</option>
  `;
  categorySelect.value = todoTask.category;
  categorySelect.onchange = function () {
    todoTasks[index].category = categorySelect.value;
    updateTodoList();
  };

  right.appendChild(completeButtonElement);
  right.appendChild(importantButtonElement);
  right.appendChild(upButton);
  right.appendChild(downButton);
  right.appendChild(categorySelect);

  // Put left + right into the li
  newTodoTaskElement.appendChild(left);
  newTodoTaskElement.appendChild(right);

  return newTodoTaskElement;
};

const toggleComplete = (index) => {
  // If it is complete, set it to incomplete
  // If it is incomplete, set it to complete
  if (todoTasks[index].completedTask == false) {
    todoTasks[index].completedTask = true;
  } else {
    todoTasks[index].completedTask = false;
  }
  updateTodoList();
};

const toggleImportant = (index) => {
  // If it is complete, set it to incomplete
  // If it is incomplete, set it to complete
  if (todoTasks[index].important == false) {
    todoTasks[index].important = true;
  } else {
    todoTasks[index].important = false;
  }
  updateTodoList();
};

const moveUp = (index) => {
  // If this item is already the first one (index 0),
  // it has nowhere to go, so we stop immediately.
  if (index === 0) return;

  // We are swapping places with the item ABOVE it.
  // Think: [A, B, C] and we want B to move up -> [B, A, C]

  // Step 1: hold the item above in a temporary "spare hand"
  const temp = todoTasks[index - 1];

  // Step 2: put the current item into the above spot
  todoTasks[index - 1] = todoTasks[index];

  // Step 3: put the saved "temp" item into the current spot
  todoTasks[index] = temp;

  // Rebuild the list on screen so we can SEE the new order
  updateTodoList();
};

const moveDown = (index) => {
  // If this item is already the last one,
  // it has nowhere to go, so we stop immediately.
  if (index === todoTasks.length - 1) return;

  // We are swapping places with the item BELOW it.
  // Think: [A, B, C] and we want B to move down -> [A, C, B]

  // Step 1: hold the item below in a temporary "spare hand"
  const temp = todoTasks[index + 1];

  // Step 2: put the current item into the below spot
  todoTasks[index + 1] = todoTasks[index];

  // Step 3: put the saved "temp" item into the current spot
  todoTasks[index] = temp;

  // Rebuild the list on screen so we can SEE the new order
  updateTodoList();
};

updateTodoList();
