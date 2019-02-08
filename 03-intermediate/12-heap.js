/* I will try to implement a binary heap using two methods:
 *
 * - Array
 * - Pointer based binary-tree
 * */

class PriorityQueue {
    constructor() {
        this.array = [];
    }

    push(item) {
        /* Push an item to the priority queue */

        let length = this.length();
        this.array[length] = item;

        let i = length;
        while (i > 0 && this.array[i] > this.array[Math.ceil(i/2 - 1)]) {
            let child = this.array[i];
            let parent = this.array[Math.ceil(i/2 - 1)];
            this.array[i] = parent;
            this.array[Math.ceil(i/2 - 1)] = child;

            i = Math.ceil(i/2 - 1);
        }
    }

    pop() {
        /* Pop item of top priority (at the top of the tree) */
        
        let length = this.length();
        if (!length) return;

        let first = this.array[0];
        let last = this.array[length - 1];
        this.array[0] = last;
        this.array[length - 1] = first;
        let value = this.array.pop();

        let i = 0;
        while (2 * i + 1 <= length - 2) {
            let left = 2 * i + 1;
            let right = 2 * i + 2;

            if (this.array[left] >= this.array[right] || this.array[right] === undefined) {
                if (this.array[i] < this.array[left]) {
                    let parent = this.array[i];
                    let child = this.array[left];
                    this.array[i] = child;
                    this.array[left] = parent;

                    i = left;
                } else {
                    break;
                }
            } else {
                if (this.array[i] < this.array[right]) {
                    let parent = this.array[i];
                    let child = this.array[right];
                    this.array[i] = child;
                    this.array[right] = parent;

                    i = right;
                } else {
                    break;
                }
            } // if/else
        } // while

        return value;
    }

    length() {
        return this.array.length;
    }
}

queue = new PriorityQueue();
queue.push(20);
queue.push(2);
queue.push(2);
queue.push(1);
queue.push(20);
queue.push(3);
queue.push(47);
queue.push(100);
console.log(queue);
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
