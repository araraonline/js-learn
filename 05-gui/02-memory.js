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

class DOMDisplay {
    constructor() {
        this.dom = document.createElement("div");
        this.attach();
    }

    draw(state) {
        this.reset();
        this._drawBoard(state);
        this._drawInformation(state);
        this._drawGameOver(state);
    }

    attach() {
        document.body.appendChild(this.dom);
    }

    reset() {
        this.dom.innerHTML = "";
    }

    _drawBoard(state) {
        let board = document.createElement("board");

        let cards = [];
        for (let i = 0; i < state.board.length; i++) {
            let card = document.createElement("card");
            card.dataset.index = i;
            if (state.board[i] === "") {
                card.classList = ["hidden"];
            } else if (state.up.includes(i)) {
                card.classList = ["up"];
                card.textContent = state.board[i];
            } else {
                card.classList = ["down"];
                card.addEventListener("click", function() {
                    state.turnUp(i);
                    display.draw(state);
                    if (state.up.length === 2) {
                        setTimeout(function() {
                            state.checkUp();
                            display.draw(state);
                        }, 1000);
                    }
                });
            }
            cards.push(card);
        }

        cards.forEach(c => board.appendChild(c));
        this.dom.appendChild(board);
    }

    _drawInformation(state) {
        let information = document.createElement("information");
        
        if (!state.gameover) {
            let turn = document.createElement("p");
            turn.textContent = `Turn: Player ${state.turn}`;
            information.appendChild(turn);

            let score = document.createElement("p");
            score.textContent += `Player A: ${state.score.A}`;
            score.textContent += ` Player B: ${state.score.B}`;
            information.appendChild(score);
        } else {
            let score = document.createElement("p");
            score.textContent += `Player A: ${state.score.A}`;
            score.textContent += ` Player B: ${state.score.B}`;
            information.appendChild(score);

            let gameover = document.createElement("p");
            gameover.textContent = "Game over!";
            information.appendChild(gameover);
        }

        this.dom.appendChild(information);
    }

    _drawGameOver(state) {
        if (state.gameover) {
            this.dom.firstChild.style.display = "none";
            let button = document.createElement("button");
            button.textContent = "New game";
            button.addEventListener("click", function() {
                state.newGame();
                display.draw(state);
            });
            this.dom.appendChild(button);
        }
    }
}

let state = new State();
let display = new DOMDisplay();
display.draw(state);
