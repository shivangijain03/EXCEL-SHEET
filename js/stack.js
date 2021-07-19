// ================================================================= Stack class =================================================================
class myStack {
    constructor() {
        this.idx = -1;  // index
        this.arr = []; // array
    }
    
    size() {
        return this.idx + 1;
    }

    push(x) {
        this.arr.push(x);
        this.idx++;
    }

    peek() {
        if (this.idx == -1) return "err";
        return this.arr[this.idx];
    }

    pop() {
        if (this.idx == -1) return "err";
        this.idx--;
        return this.arr.pop();
    }

}

// ================================================================= Evaluate function =================================================================
function eval(Infix_Formula) {

    // split the formula on the basis of space
    let arr = Infix_Formula.split(" ");


    // Now need to Evaluate INFIX EXPRESSION ( FORMULA )
    let operators = new myStack();
    let operands = new myStack();


    for (let i = 0; i < arr.length; i++) {

        // ********** find char of i **********
        let ch = arr[i];

        // ********** if operand comes **********
        if (isNumber(ch)) {
            operands.push(parseInt(ch));
        }

        // ********** if operator comes **********
        else if (ch == '+' || ch == '-' || ch == '*' || ch == '/') {
            while (operators.size() > 0 && operators.peek() != '(' && precedence(ch) <= precedence(operators.peek())) {
                let operand2 = operands.pop();
                let operand1 = operands.pop();
                let oparator = operators.pop();

                let ans = calculate(operand1, operand2, oparator);
                operands.push(ans);
            }
            operators.push(ch);
        }

         // ********** if opening bracket comes **********
         else if (ch == '(') {
            operators.push(ch);
        }

        // ********** closing bracket **********
        else if (ch == ')') {
            while (operators.size() > 0 && operators.peek() != '(') {
                let operand2 = operands.pop();
                let operand1 = operands.pop();
                let oparator = operators.pop();

                let ans = calculate(operand1, operand2, oparator);
                operands.push(ans);
            }

            // ********** also remove " ( " **********
            if (operators.size() > 0) {
                operators.pop();
            }
        }
    }

    // ********** if operator stack is not empty **********
    while (operators.size() > 0) {
        let operand2 = operands.pop();
        let operand1 = operands.pop();
        let oparator = operators.pop();

        let ans = calculate(operand1, operand2, oparator);
        operands.push(ans);
    }

    let val = operands.peek();
    return val;

}


// ================================================================= operation =================================================================
function calculate(val1, val2, op) {
    if (op == '+') {
        return val1 + val2;
    } else if (op == '-') {
        return val1 - val2;
    } else if (op == '*') {
        return val1 * val2;
    } else {
        return val1 / val2;
    }
}

// ********** check current char is number or not **********
function isNumber(n) {
    return !isNaN(parseInt(n))
}

// ================================================================= Precedance check  =================================================================
// Precence of  * /    is  2 ( high)
// Precence of  + -    is  1 ( low )
function precedence(op) {
    if (op == '+') {
        return 1;
    } else if (op == '-') {
        return 1;
    } else if (op == '*') {
        return 2;
    } else {
        return 2;
    }
}
