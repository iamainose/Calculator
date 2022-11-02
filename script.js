let currentNumber = "";
let prevNumber = "";
let operator = "";
let value = "";
let result = "";
let numbers = 0;
let currentDisplay = document.querySelector(".currentNumber");
let prevDisplay = document.querySelector(".previousNumber");
let numberButtons = document.querySelectorAll(".number");
let decimal = document.querySelector(".decimal");
let equal = document.querySelector(".equal");
let operators = document.querySelectorAll(".operator");
let deletebtn = document.querySelector(".delete");
let clear = document.querySelector(".clear");
let sum = true;

window.addEventListener("keydown", keyBoardInput);

numberButtons.forEach((number) => {
  number.addEventListener("click", function (e) {
    value = e.target.textContent;
    appendNum(value);
  });
});

operators.forEach((ops) => {
  ops.addEventListener("click", (e) => {
    value = e.target.textContent;
    operate(value);
  });
});

equal.addEventListener("click", (e) => {
  if (prevNumber === "" && currentNumber !== "") {
    currentDisplay.textContent = currentNumber;
  } else {
    this.sum = false;
    value = e.target.textContent;
    equate(value);
    display(value);
  }
});

decimal.addEventListener("click", addDecimals);

clear.addEventListener("click", clearScreen);
deletebtn.addEventListener("click", del);

function calculate() {
  currentNumber = Number(currentNumber);
  prevNumber = Number(prevNumber);
  if (operator === "+") {
    prevNumber += currentNumber;
  } else if (operator === "-") {
    prevNumber -= currentNumber;
  } else if (operator === "x") {
    prevNumber *= currentNumber;
  } else if (operator === "/") {
    prevNumber /= currentNumber;
  }
  prevNumber = roundNumber(prevNumber);
  prevNumber = prevNumber.toString();
  display();
}

function operate(op) {
  if (prevNumber === "") {
    prevNumber = currentNumber;
  } else if (operator === "/" && currentDisplay.textContent === "0") {
    clearScreen();
    alert("You can't divide by zero");
  } else {
    calculate();
    operator = op;
    currentDisplay.textContent = `${numbers}`;
    prevDisplay.textContent = prevNumber + " " + operator;
    currentNumber = result;
  }
}
console.log(operate(operators));

function equate() {
  if (this.sum === false) {
    if (operator === "/" && currentDisplay.textContent === "0") {
      clearScreen();
      alert("You can't divide by zero");
    }
    calculate();
    prevDisplay.textContent = result;
    currentDisplay.textContent = prevNumber;
    currentNumber = result;
    operator = result;
  }
}

function roundNumber(number) {
  return Math.round(number * 1000) / 1000;
}

function appendNum(number) {
  if (currentNumber.length <= 11) {
    currentNumber += number;
    currentDisplay.textContent = currentNumber;
  }
}

function clearScreen() {
  operator = result;
  currentNumber = result;
  prevNumber = result;
  prevDisplay.textContent = `${prevNumber}` + " " + `${operator}`;
  currentDisplay.textContent = `${numbers}`;
}

function display() {
  if (prevNumber.length <= 11) {
    currentDisplay.textContent = prevNumber;
  } else {
    currentDisplay.textContent = prevNumber.slice(0, 11) + "...";
  }
  prevDisplay.textContent = `${result}`;
  operator = `${result}`;
  currentNumber = `${result}`;
}

function del() {
  currentNumber = currentNumber.slice(0, -1);
  currentDisplay.textContent = currentNumber;
}

function addDecimals() {
  if (!currentNumber.includes(".")) {
    currentNumber += ".";
    currentDisplay.textContent = `${currentNumber}`;
  }
}

function keyBoardInput(e) {
  if (e.key >= 0 && e.key <= 9) {
    appendNum(e.key);
  } else if (e.key === ".") {
    addDecimals();
  } else if (e.key === "=" || e.key === "Enter") {
    if (operator === "/" && currentDisplay.textContent === "0") {
      alert("you can't divide by zero");
      clearScreen();
    } else {
      calculate();
    }
  } else if (e.key === "Escape") {
    clearScreen();
  } else if (e.key === "Backspace") {
    del();
  } else if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") {
    operate(convertInput(e.key));
  }
}

function convertInput(keyboardOperator) {
  if (keyboardOperator === "/") return "/";
  if (keyboardOperator === "*") return "x";
  if (keyboardOperator === "-") return "-";
  if (keyboardOperator === "+") return "+";
}
