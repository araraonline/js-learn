const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What is you name? ", name => {
    if (name === "Bob" || name === "Alice") {
        console.log(`Hello, ${name}!`);
    } else {
        console.log("Hello!");
    }
    rl.close();
});
