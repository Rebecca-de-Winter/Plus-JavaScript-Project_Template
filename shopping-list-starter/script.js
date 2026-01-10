let shoppingListItems = ["milk", "eggs", "bread"];
// // Here we grab the ul from the HTML
// let listElement = document.getElementById("shopping-list-items");

// for (const shoppingItem of shoppingListItems) {
//   console.log(shoppingItem);
//   // We create a list element
//   let itemElement = document.createElement("li");

//   // Add the inner text to the list element
//   itemElement.innerText = shoppingItem;

//   // Add the list element to the ul
//   listElement.appendChild(itemElement);
// }

const addItem = () => {
  const inputElement = document.getElementById("new-item-text");
  const item = inputElement.value; // value inside text item (NEW TEXT)
  shoppingListItems = [...shoppingListItems, item]; //expand out existing array (destructure). To add to the end you can .append
  console.log(shoppingListItems);
  updateItems();
  inputElement.value = "";
};

const updateItems = () => {
  // First we get the list element
  const listElement = document.getElementById("shopping-list-items");
  // Then we clear it of any existing items
  listElement.innerHTML = "";

  // Then we loop through the shopping list items and add them to the list
  for (const shoppingItem of shoppingListItems) {
    const itemElement = document.createElement("li"); //creates new html element (creates a list item because its li)
    itemElement.innerText = shoppingItem; // adding ind. item into inner text.
    listElement.appendChild(itemElement); // function that in html append as child to the list. (adds li to ul). li doesn't exist until its appended to li.
  }
};
const clearItems = () => {
  shoppingListItems = []; //create an empty array to signify that we no items in array (clearing it)
  console.log(shoppingListItems); // print the updated list
  updateItems(); // updating the UI. Takes the fact that the array has been cleared and shows it in the UI
};

updateItems();
