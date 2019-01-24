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
    let summation = 0;
    for (let n = from; n <= to; n++) {
        if (n % 3 == 0 || n % 5 == 0) {
            summation += n;
        }
    }
    return summation;
}
