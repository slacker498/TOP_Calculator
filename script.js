function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
    return Number(num1) - Number(num2);
}

function multiply(num1, num2) {
    return Number(num1) * Number(num2);
}

function divide(num1, num2) {
    if (Number(num2) === 0) return "Zero Division Error"
    return Number(num1) / Number(num2);
}

// variables to store values in a single operation of 2 numbers
let num1 = '';
let num2 = '';
let operator = '';
const operators = ['+', '\u2212', '\u00d7', '÷'];

// input object
const input = document.querySelector('input');

function operate(num1, num2, operator) {
    switch (operator) {
        case '+': 
            return add(num1, num2);
            break;
        case '\u2212': 
            return subtract(num1, num2);
            break;
        case '\u00d7': 
            return multiply(num1, num2);
            break;
        case '÷': 
            return divide(num1, num2);
            break;
        default:
            return num1;
            break;
    }
}

function updateNumberVariables(val) {
    if (val === '←') {
        num1 = Number((num1))? num1: 0
        num2 = Number((num2))? num2: 0
        if (!num1 && !operator && !num2) return;
        else if (num1 && !operator && !num2) num1 -= num1.at(-1); 
        else if (num1 && operator && !num2) operator = ''; 
        else if (!num1 && operator && num2) num2 -= num2.at(-1);
        else if (!num1 && operator && !num2) operator = '';
        else if (!num1 && !num2 && !operator) num1 -= val;
        else num2 -= num2.at(-1); // same as (num1 && operator && num2)
    } else {
        if (operators.includes(val)) {
            if (num2 && operator) {
                evalExpression();
                operator = val;
                input.value += operator;
            }
            else operator = val;
        }
        else if (val === '.') {
            console.log('.')
            if (!num1 && operator) {
                if (!(num2.includes('.'))) {
                    num2 += val; 
                    input.value += val;
                }
            }
            else if (!num2 && !operator) {
                if (!(num1.includes('.'))) {
                    num1 += val; 
                    input.value += val;
                }
            }
            else {
                if (!(num2.includes('.'))) {
                    num2 += val;
                    input.value += val;
                }
            }
        }
        else if (!num1 && operator) num2 += val;
        else if (!num2 && !operator) num1 += val;
        else num2 += val;
    }
}


function evalExpression() {
    let result = Number(operate(Number((num1))? num1: 0, Number((num2))? num2:0, operator)).toFixed(3); // orring with 0 is included to ensure '.' as a value is seen as 0
    result = (result % Number(result).toFixed(0) == 0)? Number(result).toFixed(0): '' + result;
    input.value = '' + result;
    num1 = '' + result;
    num2 = '';
    operator = '';
}

// ensure input can only be modified by buttons and not by keyboard
input.addEventListener('keypress', event => event.preventDefault());
input.addEventListener('click', event => event.preventDefault());

// add event listener to each button
document.querySelectorAll('button').forEach(
    button => button.addEventListener('click', (event) => {
        // clearing after an error (or displaying error for some time and replacing with zero)
        if (input.value === "Zero Division Error") input.value = "";

        const btnValue = button.textContent;
        switch (btnValue) {
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                input.value += btnValue;
                updateNumberVariables(btnValue);                
                break;
            case '+':
                if (!operator) input.value += btnValue;
                updateNumberVariables(btnValue);
                break;
            case '\u2212':
                if (!operator) input.value += btnValue;
                updateNumberVariables(btnValue);
                break;
            case '\u00d7':
                if (!operator) input.value += btnValue;
                updateNumberVariables(btnValue);
                break;
            case '÷':
                if (!operator) input.value += btnValue;
                updateNumberVariables(btnValue);
                break;
            case '.':
                updateNumberVariables('.');
                break;
            case '=':
                evalExpression();
                break;
            case 'Clear':
                input.value = '';
                num1 = '';
                num2 = '';
                operator = '';
                break;
            case '←':
                updateNumberVariables('←');
                input.value = input.value.substring(0, input.value.length - 1);
                break;
            default:
                break;
        }
    })
);