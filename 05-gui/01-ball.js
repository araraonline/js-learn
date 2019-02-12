/* Script to display the bouncing ball
 *
 * The only relevant element in the HTML is the canvas object
 */


function randint(from, to) {
    /* Return a random integer (inclusive range) */
    return Math.floor(Math.random() * (to - from + 1)) + from;
}

class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
}

(function() {
    // drawing context
    let canvas = document.querySelector("canvas");
    let context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 500;

    // ball state
    let radius = 20;
    let position = new Vector(
        randint(radius, canvas.width - radius),
        randint(radius, canvas.height - radius)
    );
    let speed = new Vector(100 / 60, 100 / 60);

    function animate() {
        // update state
        if (position.x - radius < 0) {
            speed.x = Math.abs(speed.x);
        } else if (position.x + radius > canvas.width) {
            speed.x = -Math.abs(speed.x);
        }

        if (position.y - radius < 0) {
            speed.y = Math.abs(speed.y);
        } else if (position.y + radius > canvas.height) {
            speed.y = -Math.abs(speed.y);
        }

        position = position.add(speed);

        // synchronize state
        context.fillStyle = "#EEE";
        context.strokeStyle = "#222";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#222";
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, 2 * Math.PI);
        context.fill();

        // request next animation loop
        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
})();
