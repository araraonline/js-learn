function generateExpression(seed) {
    let operators = seed.toString(3).padStart(8, 0);

    let expression = "1";
    for (let i = 0; i < operators.length; i++) {
        if (operators[i] === "1") {
            expression += "-";
        } else if (operators[i] === "2") {
            expression += "+";
        }
        expression += i + 2;
    }

    return expression
}

for (let n = 0; n < 3 ** 8; n++) {
    let expression = generateExpression(n);
    if (eval(expression) === 100) {
        console.log(expression);
    }
}
