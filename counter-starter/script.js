const add = (step) => {
  // We gave the number element an id of number so we can use that to get the element
  let numberElement = document.getElementById("number");
  // We can use the innerText property to get the text inside the element
  let number = numberElement.innerText;
  number = parseInt(number) + step; // this changes the inner text (string) to a number.
  numberElement.innerText = number;
};

const minus = (step) => {
  // We gave the number element an id of number so we can use that to get the element
  let numberElement = document.getElementById("number");
  // We can use the innerText property to get the text inside the element
  let number = numberElement.innerText;
  number = parseInt(number) - step; // this changes the inner text (string) to a number.
  numberElement.innerText = number;
};

const reset = (step) => {
  // We gave the number element an id of number so we can use that to get the element
  let numberElement = document.getElementById("number");
  // We can use the innerText property to get the text inside the element
  let number = numberElement.innerText;
  number = 0; // this changes the inner text (string) to 0.
  numberElement.innerText = number;
};

const applyChange = () => {
  let numberElement = document.getElementById("number");
  let UserInput = document.getElementById("userInput");
  let currentNumber = Number(numberElement.innerText);
  let changedNumber = Number(UserInput.value);
  numberElement.innerText = currentNumber + changedNumber;
};
