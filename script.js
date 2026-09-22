class Calculator {
  constructor(previousOperandEl, currentOperandEl) {
    this.previousOperandEl = previousOperandEl;
    this.currentOperandEl = currentOperandEl;
    this.clear();
  }

  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
    if (this.currentOperand === '') this.currentOperand = '0';
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    if (this.currentOperand === '0' && number !== '.') {
      this.currentOperand = number.toString();
    } else {
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let result;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (this.operation) {
      case 'add':
        result = prev + current;
        break;
      case 'subtract':
        result = prev - current;
        break;
      case 'multiply':
        result = prev * current;
        break;
      case 'divide':
        result = current === 0 ? 'Error' : prev / current;
        break;
      default:
        return;
    }

    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }

  updateDisplay() {
    this.currentOperandEl.textContent = this.currentOperand;
    if (this.operation != null) {
      const opSymbols = { add: '+', subtract: '−', multiply: '×', divide: '÷' };
      this.previousOperandEl.textContent =
        `${this.previousOperand} ${opSymbols[this.operation]}`;
    } else {
      this.previousOperandEl.textContent = '';
    }
  }
}

const previousOperandEl = document.getElementById('previous-operand');
const currentOperandEl = document.getElementById('current-operand');
const calculator = new Calculator(previousOperandEl, currentOperandEl);

document.querySelectorAll('[data-number]').forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.textContent);
    calculator.updateDisplay();
  });
});

document.querySelectorAll('.operator').forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.dataset.action);
    calculator.updateDisplay();
  });
});

document.querySelector('[data-action="equals"]').addEventListener('click', (e) => {
  calculator.compute();
  calculator.updateDisplay();
  createSparkles(e.target);
});

document.querySelector('[data-action="clear"]').addEventListener('click', () => {
  calculator.clear();
  calculator.updateDisplay();
});

document.querySelector('[data-action="delete"]').addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

function createSparkles(element) {
  const rect = element.getBoundingClientRect();
  const symbols = ['✨', '⭐', '🌟'];
  for (let i = 0; i < 6; i++) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    sparkle.style.left = `${rect.left + Math.random() * rect.width}px`;
    sparkle.style.top = `${rect.top + Math.random() * rect.height}px`;
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 800);
  }
}
