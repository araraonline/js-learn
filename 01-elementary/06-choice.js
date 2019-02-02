let prompt = require("prompt-sync")();

function sum(to) {
    /*
     * Return the sum of integers up to 'to'.
     *
     * Example:
     *
     * >>> sum(1)
     * 1
     * >>> sum(2)
     * 3
     * >>> sum(3)
     * 6
    */
    let summation = 0;
    for (let n = 1; n <= to; n++) {
        summation += n;
    }
    return summation;
}

function multiply(to) {
    /*
     * Return the multiplication of integers up to 'to'.
     * 
     * Same as factorial(to).
    */
    let product = 1;
    for (let n = 1; n <= to; n++) {
        product *= n;
    }
    return product;
}

let number = Number(prompt("Please choose a number: "));
let operation = prompt("Please choose an operation ('s' for sum and 'm' for multiplication): ");
let result = operation === 's' ? sum(number) : multiply(number);
console.log(`The result is ${result}!`);
