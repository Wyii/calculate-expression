let numberReg = /\d/;
let plusReg = /\+/;
let minusReg = /-/;
let timesReg = /\*/;
let dividReg = /\//;
let leftReg = /\(/;
let rightReg = /\)/;
let operatorValue = { '+': 0, "-": 0, "*": 1, "/": 1 };

function calculate(expression = "") {
    let stack = [];
    let expressionLength = expression.length;
    for (let i = 0; i <= expressionLength - 1; i++) {
        let item = expression[i];
        if (item.match(numberReg)) {
            stack.push(item);
        } else {
            let n1 = parseInt(stack.pop());
            let n2 = parseInt(stack.pop());
            let midResult = baseCalculate(n2, n1, item);
            stack.push(midResult);
            console.log({ n1, n2, item, midResult, stack })
        }
    }
    console.log(stack.pop());
}

function baseCalculate(n1, n2, operator) {
    switch (operator) {
        case "+": return n1 + n2; break;
        case "-": return n1 - n2; break;
        case "*": return n1 * n2; break;
        case "/": return n1 / n2; break;
        default: return 0;
    }
}

function translate(expression = "") {
    let operatorStack = [];
    let midStack = [];
    for (let c of expression) {
        console.log(c)
        if (c.match(numberReg)) {
            midStack.push(c);
        } else if (c.match(plusReg) || c.match(minusReg) || c.match(timesReg) || c.match(dividReg)) {
            if (operatorStack.length == 0 || operatorStack[operatorStack.length - 1].match(leftReg)) {
                operatorStack.push(c);
            } else {
                while (!compare(c, operatorStack[operatorStack.length - 1]) && operatorStack.length > 0) {
                    midStack.push(operatorStack.pop());
                }
                operatorStack.push(c)
            }
        } else if (c.match(leftReg)) {
            operatorStack.push(c);
        } else if (c.match(rightReg)) {
            while (!operatorStack[operatorStack.length - 1].match(leftReg) && operatorStack.length > 0) {
                midStack.push(operatorStack.pop());
            }
            operatorStack.pop();
        }
    }
    while (operatorStack.length > 0) {
        midStack.push(operatorStack.pop());
    }
    let endExp = midStack.join('');
    console.log(endExp);
    return endExp;
}

function compare(newOperator, topOperator) {
    return operatorValue[topOperator] < operatorValue[newOperator];
}

translate('1+3*4*(2+7)-6*5')
calculate('134*27+*+65*-')