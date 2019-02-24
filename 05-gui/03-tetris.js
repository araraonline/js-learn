/*
 * I am responsible for the nuts and bolts of a Tetris application
 *
 *
 * Flow:
 *
 *   +---------+            +---------+            +----------+
 *   |         |    start   |         |  gameover  |          |
 *   | Title   |  +------>  | Game    | +------->  | Gameover |
 *   |  Screen |            |  Screen |            |  Screen  |
 *   |         |            |         |            |          |
 *   +---------+            +---------+            +----------+
 *
 *                               ^                       +
 *                               |        restart        |
 *                               +-----------------------+
 */


/* Screens */

function titleScreen() {
    /* Presents the title screen */

    // set view
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);

    context.fillStyle = '#AAA';
    context.textAlign = 'center';
    context.font = 'caption';
    context.fillText("Press 's' to start", PIXEL_WIDTH / 2, PIXEL_HEIGHT / 2);

    // set controller
    function receiveKeyup(event) {
        if (event.key === 's') {
            event.preventDefault();
            startGame();
        }
    }
    body.addEventListener('keyup', receiveKeyup);

    // call game
    function startGame() {
        body.removeEventListener('keyup', receiveKeyup);
        gameScreen();
    }
}


function gameScreen() {
    /*
     * Presents the game screen:
     *
     *  +-------------------------------------------------------------------------------------+
     *  |                                                                                     |
     *  |                                                                                     |
     *  |                                                 +------------+                      |
     *  |                                                 |            |                      |
     *  |                          set flags              | Controller | <-+                  |
     *  |  USER INPUT  +----------------------------->    |  State     |   |                  |
     *  |                                                 |            |   |                  |
     *  |      +                                          +------------+   |                  |
     *  |      |                                                           | use/unset flags  |
     *  |      |                                                           |                  |
     *  |      |            +---------->+                  +-------+       |                  |
     *  |      |  resume    ^           |      update      |       | +-----+                  |
     *  |      +-------->   | Animation |  +----------->   | State |                          |
     *  |                   |  Loop     |                  |       | <-----+                  |
     *  |      +-------->   |           v  +               +-------+       |                  |
     *  |      |   start    +<----------+  |                               |                  |
     *  |      |                           |                               |use               |
     *  |      |                           |                               |                  |
     *  |      |                           |                +------+       |                  |
     *  |      +                           |   update       |      |       |                  |
     *  |                                  +------------->  | View | +-----+                  |
     *  |  FIRST RUN                                        |      |                          |
     *  |                                                   +------+                          |
     *  |                                                                                     |
     *  |                                                      +                              |
     *  |                                                      +--------->  OUTPUT TO SCREEN  |
     *  |                                                                                     |
     *  |                                                                                     |
     *  +-------------------------------------------------------------------------------------+
     */


    /* Classes */

    class State {
        /* Represents the current game state */

        constructor(piece, pile, tick=0, gameover=false) {
            this.piece = piece || this._newPiece();
            this.pile = pile || new Pile();
            this.tick = tick;
            this.gameover = gameover;
        }

        update() {
            /*
             * Do a series of updates to the piece and pile
             * and return a new state.
             */

            let piece = this.piece;
            let pile = this.pile;
            let tick = this.tick;

            // move piece down (or add it to the pile)
            if ((!controller.down && this.tick % 12 === 0) ||
                (controller.down && this.tick % 1 === 0)) {
                let downPiece = piece.moveDown();
                if (this._onBounds(downPiece) && !this._collides(downPiece, pile)) {
                    // piece can be moved down
                    piece = downPiece;
                } else {
                    // add piece to pile
                    pile = pile.addPiece(piece);
                    if (this._overflow(pile)) {
                        // pile overflows: gameover
                        controller.left = false;
                        controller.right = false;
                        controller.up = false;
                        return new State(piece, pile, tick, true);
                    } else {
                        controller.left = false;
                        controller.right = false;
                        controller.up = false;
                        return new State(
                            this._newPiece(),
                            pile.update(),  // clear fulfilled lines
                            tick + 1
                        );
                    }
                }
            }

            // rotate piece
            if (controller.up) {
                let rotatedPiece = piece.rotate();
                if (this._onBounds(rotatedPiece) && !this._collides(rotatedPiece, pile)) {
                    piece = rotatedPiece;
                }
                controller.up = false;
            }

            // move piece left
            if (controller.left) {
                let leftPiece = piece.moveLeft();
                if (this._onBounds(leftPiece) && !this._collides(leftPiece, pile)) {
                    piece = leftPiece;
                }
                controller.left = false;
            }

            // move piece right
            if (controller.right) {
                let rightPiece = piece.moveRight();
                if (this._onBounds(rightPiece) && !this._collides(rightPiece, pile)) {
                    piece = rightPiece;
                }
                controller.right = false;
            }

            return new State(piece, pile, tick + 1);
        }

        _onBounds(piece) {
            /* Check if piece is within the left-right-bottom bounds */

            return piece.blocks.every(
                b => (b.x >= 0) && (b.x < CONFIG.width) && (b.y >= 0));
        }

        _collides(piece, pile) {
            /* Check if piece collides with pile */

            for (let b1 of piece.blocks) {
                for (let b2 of pile.blocks) {
                    if (b1.equals(b2)) {
                        return true;
                    }
                }
            }
            return false;
        }

        _overflow(pile) {
            /* Check if pile is above the screen boundary */

            return pile.blocks.some(
                b => (b.y >= CONFIG.height));
        }

        _newPiece() {
            /* Create a new piece at the correct location */

            return Piece.random(
                new Vector(Math.floor(CONFIG.width / 2), CONFIG.height)
            );
        }
    }

    class Piece {
        constructor(center, shapes, rotation=0) {
            this.center = center;
            this.shapes = shapes;
            this.rotation = rotation;
            this.blocks = this.shapes[this.rotation].map(b => b.add(this.center));
        }

        static random(center) {
            return new Piece(center, randomItem(Piece.SHAPES));
        }

        moveLeft() {
            return new Piece(
                this.center.add(new Vector(-1, 0)),
                this.shapes,
                this.rotation
            );
        }

        moveRight() {
            return new Piece(
                this.center.add(new Vector(1, 0)),
                this.shapes,
                this.rotation
            );
        }

        moveDown() {
            return new Piece(
                this.center.add(new Vector(0, -1)),
                this.shapes,
                this.rotation
            );
        }

        rotate() {
            return new Piece(
                this.center,
                this.shapes,
                (this.rotation + 1) % this.shapes.length
            );
        }
    }

    Piece.SHAPES = [
        // square
        [[new Vector(-1, +1), new Vector(+0, +1), new Vector(-1, +0), new Vector(+0, +0)]],

        // long
        [[new Vector(-2, +0), new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0)],
         [new Vector(+0, +2), new Vector(+0, +1), new Vector(+0, +0), new Vector(+0, -1)]],

        // right stairs
        [[new Vector(+0, +1), new Vector(+1, +1), new Vector(-1, +0), new Vector(+0, +0)],
         [new Vector(+0, +1), new Vector(+0, +0), new Vector(+1, +0), new Vector(+1, -1)]],

        // left stairs
        [[new Vector(-1, +1), new Vector(+0, +1), new Vector(+0, +0), new Vector(+1, +0)],
         [new Vector(+1, +1), new Vector(+1, +0), new Vector(+0, +0), new Vector(+0, -1)]],

        // triangle
        [[new Vector(+0, +1), new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0)],
         [new Vector(+0, +1), new Vector(+0, +0), new Vector(+1, +0), new Vector(+0, -1)],
         [new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0), new Vector(+0, -1)],
         [new Vector(+0, +1), new Vector(-1, +0), new Vector(+0, +0), new Vector(+0, -1)]],

        // right bed
        [[new Vector(-1, +1), new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0)],
         [new Vector(+0, +1), new Vector(+1, +1), new Vector(+0, +0), new Vector(+0, -1)],
         [new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0), new Vector(+1, -1)],
         [new Vector(+0, +1), new Vector(+0, +0), new Vector(-1, -1), new Vector(+0, -1)]],

        // left bed
        [[new Vector(+1, +1), new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0)],
         [new Vector(+0, +1), new Vector(+0, +0), new Vector(+0, -1), new Vector(+1, -1)],
         [new Vector(-1, +0), new Vector(+0, +0), new Vector(+1, +0), new Vector(-1, -1)],
         [new Vector(-1, +1), new Vector(+0, +1), new Vector(+0, +0), new Vector(+0, -1)]],
    ]

    class Pile {
        constructor(blocks) {
            this.blocks = blocks || [];
        }

        addPiece(piece) {
            return new Pile(this.blocks.concat(piece.blocks));
        }

        update() {
            /* Return a new pile with fulfilled lines consumed */

            let pile = this;
            let index = 0;

            while (index < CONFIG.height) {
                let fulfilled = pile.blocks.filter(b => b.y === index).length === CONFIG.width;
                if (!fulfilled) {
                    index++;
                } else {
                    let blocksAbove = pile.blocks.filter(b => b.y > index);
                    let blocksBelow = pile.blocks.filter(b => b.y < index);
                    pile = new Pile(
                        blocksAbove
                            .map(b => b.add(new Vector(0, -1)))
                            .concat(blocksBelow)
                    );
                }
            }

            return pile;
        }
    }

    class View {
        constructor() {
            this.context = canvas.getContext('2d');
        }

        update() {
            // clear canvas
            this.context.fillStyle = 'black';
            this.context.fillRect(0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);

            // draw piece
            this.context.fillStyle = '#AAA';
            state.piece.blocks.forEach(b => this._fillSquare(b));

            // draw pile
            this.context.fillStyle = '#444';
            state.pile.blocks.forEach(b => this._fillSquare(b));
        }

        _fillSquare(position) {
            /*
             * Fills square at given position:
             *
             *   RXXXXX
             *   XXXXXX
             *   XXXXXX
             *   XXXXXX
             *
             *   X = square to fill
             *   R = reference point
             *
             */

            this.context.fillRect(
                position.x * CONFIG.scale,
                (CONFIG.height - position.y - 1) * CONFIG.scale,
                CONFIG.scale,
                CONFIG.scale
            );
        }
    }


    /* Functions */

    function loop() {
        if (controller.pause) {
            controller.pause = false;
            paused = true;
            return;
        }

        state = state.update();
        if (state.gameover) {
            gameover();
            return;
        }
        view.update();
        setTimeout(
            function() {requestAnimationFrame(loop)},
            1000 / CONFIG.fps - 5  // framerate hack
        );
    }

    function gameover() {
        body.removeEventListener('keydown', receiveKeydown);
        body.removeEventListener('keyup', receiveKeyup);
        gameoverScreen();
    }

    function receiveKeydown(event) {
        if (!paused) {
            if (event.key === 'ArrowUp') {
                event.preventDefault();
                controller.up = true;
            } else if (event.key === 'ArrowDown') {
                event.preventDefault();
                controller.down = true;
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                controller.left = true;
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                controller.right = true;
            }
        }
    }

    function receiveKeyup(event) {
        if (paused && event.key === 'p') {
            // resume the animation
            event.preventDefault();
            paused = false;
            requestAnimationFrame(loop);
        } else if (!paused) {
            if (event.key === 'p') {
                event.preventDefault();
                controller.pause = true;
            } else if (event.key === 'ArrowDown') {
                // release speed key
                event.preventDefault();
                controller.down = false;
            }
        }
    }


    /* Initialization code */

    let paused = false;
    let controller = {
        pause: false,
        left: false,
        right: false,
        up: false,
        down: false
    };
    let state = new State();
    let view = new View();

    body.addEventListener('keydown', receiveKeydown);
    body.addEventListener('keyup', receiveKeyup);

    requestAnimationFrame(loop);
}


function gameoverScreen() {
    /* Presents the gameover screen */

    // set view
    let context = canvas.getContext('2d');

    context.fillStyle = 'black';
    context.fillRect(0, 0, PIXEL_WIDTH, PIXEL_HEIGHT);

    context.fillStyle = '#AAA';
    context.textAlign = 'center';
    context.font = 'caption';
    context.fillText("Press 'r' to restart the game", PIXEL_WIDTH / 2, PIXEL_HEIGHT / 2);

    // set controller
    function receiveKeyup(event) {
        if (event.key === 'r') {
            event.preventDefault();
            startGame();
        }
    }
    body.addEventListener('keyup', receiveKeyup);

    // call game
    function startGame() {
        body.removeEventListener('keyup', receiveKeyup);
        gameScreen();
    }
}


/* Utils */

class Vector {
    /* Represents a 2d vector */

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add(other) {
        return new Vector(
            this.x + other.x,
            this.y + other.y
        );
    }

    equals(other) {
        return (this.x === other.x) && (this.y === other.y);
    }
}

function randomItem(list) {
    /* Retrieve a random item from list */

    return list[Math.floor(Math.random() * list.length)];
}


/* Initialization code */

const CONFIG = {
    width: 10,
    height: 24,
    scale: 30,
    fps: 30,
}
const PIXEL_WIDTH = CONFIG.width * CONFIG.scale;
const PIXEL_HEIGHT = CONFIG.height * CONFIG.scale;

let body = document.body;
let canvas = document.querySelector("canvas");
canvas.width = PIXEL_WIDTH;
canvas.height = PIXEL_HEIGHT;

titleScreen();
