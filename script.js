let currentNum = "";
let previousNum = "";
let operator = "";

let currentDisplayNum = document.querySelector('.currentNumber');
let previousDisplayNum = document.querySelector('.previousNumber');
let numberButtons = document.querySelectorAll('.number');
let decimal = document.querySelector('.decimal');
let equal = document.querySelector('.equal');
let operators = document.querySelectorAll('.operator');
let deleteButton = document.querySelector('.delete');
let output = document.querySelector('.output');
 equal = document.querySelector(".equal");
equal.addEventListener("click", () => {
  if (currentNum != "" && previousNum != "") {
    calculator();
  }
});

decimal = document.querySelector(".decimal");
decimal.addEventListener("click", () => {
  addDecimal();
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", clearCalculator);

deleteButton.addEventListener('click', function() {
    currentNum = currentNum.slice(0, -1);
    currentDisplayNum.textContent = currentNum;
})


numberButtons.forEach(num => {
     num.addEventListener('click', (e) => {
        handleNumber(e.target.textContent);
        
     })
})


function handleNumber(number) {
    if (previousNum === "" && currentNum !== "" && operator === "") {
      previousNum = "";
      currentDisplayNum.textContent = currentNum;
    }
    if (currentNum.length <= 11) {
      currentNum += number;
      currentDisplayNum.textContent = currentNum;
    }
  }

function calculator() {
    previousNum = Number(previousNum);
    currentNum = Number(currentNum);
     if(operator === "+") {
         previousNum += currentNum;
     } else if(operator === "-") {
         previousNum -= currentNum;
     } else if(operator === "x") {
         previousNum *= currentNum;
     } else if(operator === "/") {
        if (currentNum <= 0) {
            previousNum = "Error";
            displayResults();
            return;
        }
        previousNum /= currentNum;
     } 
     previousNum = roundNumber(previousNum);
     previousNum = previousNum.toString();
     displayResults();
}

function roundNumber(num) {
    return Math.round(num * 100000) / 100000;
  }
  
  function displayResults() {
    if (previousNum.length <= 11) {
      currentDisplayNum.textContent = previousNum;
    } else {
      currentDisplayNum.textContent = previousNum.slice(0, 11) + "...";
    }
    previousDisplayNum.textContent = "";
    operator = "";
    currentNum = "";
  }

operators.forEach(op => {
     op.addEventListener('click', function(e) {   
        handleOperator(e.target.textContent);
     })
})

function handleOperator(op) {
    if (previousNum === "") {
      previousNum = currentNum;
      operatorCheck(op);
    } else if (currentNum === "") {
      operatorCheck(op);
    } else {
      calculator();
      operator = op;
      currentDisplayNum.textContent = "0";
      previousDisplayNum.textContent = previousNum + " " + operator;
    }
  }
  
  function operatorCheck(text) {
    operator = text;
    previousDisplayNum.textContent = previousNum + " " + operator;
    currentDisplayNum.textContent = "0";
    currentNum = "";
  }

  function clearCalculator() {
    currentNum = "";
    previousNum = "";
    operator = "";
    currentDisplayNum.textContent = "0";
    previousDisplayNum.textContent = "";
  }
  
  function addDecimal() {
    if (!currentNum.includes(".")) {
      currentNum += ".";
      currentDisplayNum.textContent = currentNum;
    }
  }

