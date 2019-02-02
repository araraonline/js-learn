const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Choose a number: ", number => {
    let sum = sumFromTo(1, Number(number));
    console.log(`The sum from 1 to ${number} is ${sum}`);
    rl.close();
});

function sumFromTo(from, to) {
    /* Sum integers from 'from' to 'to' (inclusive) */
    let summation = 0;
    for (let n = from; n <= to; n++) {
        summation += n;
    }
    return summation;
}
