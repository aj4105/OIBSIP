const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        const action = button.getAttribute('data-action');

        if (value !== null) {
    const isOperator = ['+', '-', '*', '/'].includes(value);
    const lastChar = currentInput.slice(-1);
    const lastCharIsOperator = ['+', '-', '*', '/'].includes(lastChar);

    if (value === '.') {
        // Prevent multiple decimals in the current number segment
        const lastNumberSegment = currentInput.split(/[+\-*/]/).pop();
        if (lastNumberSegment.includes('.')) {
            return; // ignore extra decimal point
        }
    }

    if (isOperator) {
        if (currentInput === '') {
            return; // don't allow starting with an operator
        }
        if (lastCharIsOperator) {
            // Replace the last operator instead of stacking a new one
            currentInput = currentInput.slice(0, -1) + value;
            display.value = currentInput;
            return;
        }
    }

    currentInput += value;
    display.value = currentInput;
}

        if (action === 'clear') {
            currentInput = '';
            display.value = '';
        }

        if (action === 'backspace') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        }

        if (action === 'equals') {
            calculateResult();
        }
    });
});

function calculateResult() {
    try {
        if (/\/0(?!\d)/.test(currentInput.replace(/\s/g, ''))) {
            display.value = 'Error: Div by 0';
            currentInput = '';
            return;
        }

        const result = evaluateExpression(currentInput);
        display.value = result;
        currentInput = result.toString();
    } catch (err) {
        display.value = 'Error';
        currentInput = '';
    }
}

function evaluateExpression(expr) {
    // Tokenize the expression into numbers and operators
    const tokens = expr.match(/(\d+\.?\d*)|[+\-*/]/g);
    if (!tokens) throw new Error('Invalid expression');

    // First pass: handle * and /
    let stack = [parseFloat(tokens[0])];
    for (let i = 1; i < tokens.length; i += 2) {
        const operator = tokens[i];
        const nextNum = parseFloat(tokens[i + 1]);

        if (operator === '*') {
            stack.push(stack.pop() * nextNum);
        } else if (operator === '/') {
            if (nextNum === 0) throw new Error('Division by zero');
            stack.push(stack.pop() / nextNum);
        } else {
            stack.push(operator, nextNum);
        }
    }

    // Second pass: handle + and -
    let result = stack[0];
    for (let i = 1; i < stack.length; i += 2) {
        const operator = stack[i];
        const num = stack[i + 1];
        if (operator === '+') result += num;
        if (operator === '-') result -= num;
    }

    return result;
}