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
