export function initCalculator() {
  const display = document.getElementById("display");
  let firstNum = "";
  let secondNum = "";
  let operator = null;
  let shouldReset = false;

  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const num = button.dataset.num;
      const op = button.dataset.op;

      if (num !== undefined) appendNumber(num);
      if (op !== undefined) chooseOperator(op);
      if (button.id === "clear") clearDisplay();
      if (button.id === "equals") compute();
    });
  });

  function appendNumber(num) {
    if (shouldReset) {
      display.value = "";
      shouldReset = false;
    }
    display.value += num;
  }

  function chooseOperator(op) {
    if (operator !== null) compute();
    firstNum = display.value;
    operator = op;
    shouldReset = true;
  }

  function compute() {
    if (!operator || !firstNum) return;
    secondNum = display.value;
    let result;
    const a = parseFloat(firstNum);
    const b = parseFloat(secondNum);

    switch (operator) {
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
        result = a / b;
        break;
    }

    display.value = result;
    operator = null;
    firstNum = result;
    shouldReset = true;
  }

  function clearDisplay() {
    display.value = "";
    firstNum = "";
    secondNum = "";
    operator = null;
  }
}
