let num1 = "";
let num2 = "";
let operand = "";
let num1Set = false;
let operandSet = false;
let num2Set = false;
let errorState = false;

const display = document.getElementById("display-text");

function handleInput(value) {
  // Check if there is a current error
  // If we are in error state, reset everything before handling new input
  if (errorState) {
    num1 = "";
    num2 = "";
    operand = "";
    num1Set = false;
    operandSet = false;
    num2Set = false;
    display.textContent = "0";
    errorState = false;
  }

  if (!isNaN(value) || value === ".") {
    // number pressed
    if (!operandSet) {
      if (value === "." && num1.includes(".")) {
        return; // Prevent a second decimal in num1
      }
      num1 += value;
      num1Set = true;
      display.textContent = num1;
    } else {
      if (value === "." && num2.includes(".")) {
        return; // Prevent a second decimal in num1
      }
      num2 += value;
      num2Set = true;
      display.textContent = `${num1} ${operand} ${num2}`;
    }
  } else if (["+", "-", "*", "/"].includes(value)) {
    // operand pressed
    if (num1Set && num2Set) {
      // calculate previous
      num1 = String(operate(num1, operand, num2));
      display.textContent = num1;
      num2 = "";
      num2Set = false;
    }
    operand = value;
    display.textContent = `${num1} ${operand}`;
    operandSet = true;
  } else if (value === "=") {
    if (num1Set && operandSet && num2Set) {
      num1 = String(operate(num1, operand, num2));
      display.textContent = num1;
      operandSet = false;
      num2 = "";
      num2Set = false;
    }
  } else if (value === "clear") {
    num1 = "";
    num2 = "";
    operand = "";
    num1Set = false;
    operandSet = false;
    num2Set = false;
    display.textContent = "0";
  } else if (value === "delete") {
    if (num2Set) {
      num2 = num2.slice(0, -1);
      display.textContent = num2 || "0";
    } else if (operandSet) {
      operand = "";
      operandSet = false;
    } else if (num1Set) {
      num1 = num1.slice(0, -1);
      display.textContent = num1 || "0";
    }
  }
}

// Basic operate function
function operate(a, op, b) {
  a = parseFloat(a);
  b = parseFloat(b);
  let result;
  switch (op) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) {
        errorState = true;
        return "Error";
      }

      result = a / b;
      break;
  }
  // Format the result to 5 decimal places before returning
  return parseFloat(result.toFixed(5));
}

// Add event listener on calculator buttons
const calculator = document.querySelector(".calculator");

calculator.addEventListener("click", (e) => {
  if (e.target.tagName == "BUTTON") {
    const value = e.target.dataset.value;
    handleInput(value);
  }
});

// Handles keypresses
document.addEventListener("keydown", (e) => {
  let key = e.key;

  //Special cases -> transalte the keys into calculator values
  if (key === "Enter") key = "=";
  if (key === "Backspace") key = "delete";
  if (key === "Escape") key = "clear";

  const allowedKeys = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "/",
    "=",
    "delete",
    "clear",
  ];

  if (allowedKeys.includes(key)) {
    handleInput(key);
  }
});
