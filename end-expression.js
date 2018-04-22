function calculate(expression = "") {
    let stack = [];
    let numberReg = /\d/;
    let expressionLength = expression.length;
    for (let i = 0; i <= expressionLength - 1; i++) {
        let item = expression[i];
        if (item.match(numberReg)) {
            stack.push(item);
        } else {
            let n1 = parseInt(stack.pop());
            let n2 = parseInt(stack.pop());
            let midResult = baseCalculate(n2, n1 , item);
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

calculate('134*27+*+65*-')