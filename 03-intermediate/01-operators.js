for (let n = 0; n < 3 ** 8; n++) {
    let operators = n.toString(3).padStart(8, 0);
    let expression = "1";
    for (let i = 0; i < operators.length; i++) {
        let operator = operators[i];

        if (operator === "1") {
            expression += "-";
        } else if (operator === "2") {
            expression += "+";
        }
        expression += i + 2;
    }

    if (eval(expression) === 100) {
        console.log(expression);
    }
}
