/* Implementation of a memory game
 *
 * First, it will work on the CLI only
 * */


function shuffle(array) {
    let result = [];
    array = array.slice();
    while (array.length) {
        let index = Math.floor(Math.random() * array.length);
        result.push(array[index]);
        array = array.slice(0, index).concat(array.slice(index + 1));
    }
    return result;
}

function randomBoard() {
    return shuffle(["1", "2", "3", "1", "2", "3"]);
}

class State {
    constructor() {
        this.newGame();
    }

    newGame() {
        // starts a new game
        this.board = randomBoard();
        this.up = [];  // cards turned up
        this.turn = "A";
        this.score = {"A": 0, "B": 0};
        this.gameover = false;
    }

    turnUp(cardPosition) {
        // let player turn a card up
        if (!this.board[cardPosition]) {
            throw new Error("Turning at empty position");
        }
        if (this.up.includes(cardPosition)) {
            throw new Error("Card already turned.");
        }
        if (this.up.length >= 2) {
            throw new Error("Can only turn 2 cards at once.");
        }
        this.up.push(cardPosition);
    }

    checkUp() {
        // check the cards moved up and move to the next state
        if (this.up.length === 2) {
            let cards = this.up.map(i => this.board[i]);
            if (cards[0] === cards[1]) {
                // player turned a pair
                this.board[this.up[0]] = "";
                this.board[this.up[1]] = "";
                this.up = [];
                this.score[this.turn] += 1;
                if (!this.board.some(c => c)) {
                    this.gameover = true;
                }
            } else {
                this.up = [];
                this.turn = this.turn === "A" ? "B" : "A";
            }
        }
    }

}

exports.shuffle = shuffle;
exports.randomBoard = randomBoard;
exports.State = State;
