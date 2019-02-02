/* Play a guessing game */

const prompt = require("prompt-sync")();

function playGame() {
    let guessedNumbers = [];
    let secret = Math.floor(Math.random() * 100) + 1;

    while (true) {
        let input = Number(prompt("Please, guess a number between 0 and 100: "));
        if (guessedNumbers.includes(input)) {
            console.log("You have already guessed this number.");
            continue;
        }
        guessedNumbers.push(input);

        if (input < secret) {
            console.log("Too small.");
        } else if (input > secret) {
            console.log("Too big.");
        } else {
            console.log("Correct!");
            console.log(`And it took you ${guessedNumbers.length} tries.`);
            return;
        }
    }
}

playGame();
