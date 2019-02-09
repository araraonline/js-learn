/* I will try to implement a binary heap using two methods:
 *
 * - Array
 * - Pointer based binary-tree
 * */


// Array based implementation

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


// Pointer based implementation

class PointerPriorityQueue {
    constructor() {
        this.root = null;
        this.length = 0;
    }

    push(value) {
        /* Push an item to the priority queue */

        if (!this.root) {
            this.root = {
                value,
                parent: null,
                leftChild: null,
                rightChild: null
            };
            this.length = 1;
            return;
        }

        // add element to bottom
        let index = this.length;
        let node;
        if (index % 2 === 0) {
            let parent = this._findNode((index - 2) / 2);
            node = parent.rightChild = {
                value,
                parent,
                leftChild: null,
                rightChild: null
            };
            this.length += 1;
        } else {
            let parent = this._findNode((index - 1) / 2);
            node = parent.leftChild = {
                value,
                parent,
                leftChild: null,
                rightChild: null
            }
            this.length += 1;
        }

        // move element up until it fits
        while (node.parent &&
               node.value > node.parent.value) {
            this._swapValue(node, node.parent);
            node = node.parent;
        }
    }

    pop() {
        /* Pop item of top priority (at the top of the tree) */
        
        if (!this.root) {
            return undefined
        };

        if (this.length === 1) {
            let result = this.root.value;
            this.root = null;
            this.length = 0;
            return result;
        }

        let result = this.root.value;

        // swap first and last node values
        let lastNode = this._findNode(this.length - 1);
        this._swapValue(this.root, lastNode);

        // remove last node
        if ((this.length - 1) % 2 === 0) {
            lastNode.parent.rightChild = null;
        } else {
            lastNode.parent.leftChild = null;
        }
        this.length -= 1;

        // move element down until it fits
        let node = this.root;
        while (node.leftChild) {
            if (!node.rightChild || node.leftChild.value >= node.rightChild.value) {
                if (node.value < node.leftChild.value) {
                    this._swapValue(node, node.leftChild);
                    node = node.leftChild;
                } else {
                    break;
                }
            } else {
                if (node.value < node.rightChild.value) {
                    this._swapValue(node, node.rightChild);
                    node = node.rightChild;
                } else {
                    break;
                }
            }
        }

        return result;
    }

    _findNode(index) {
        /* Find a node given an index */
        let path = [];
        while (index > 0) {
            if (index % 2 === 1) {
                path.push("leftChild");
                index = (index - 1) / 2;
            } else {
                path.push("rightChild");
                index = (index - 2) / 2;
            }
        }

        let node = this.root;
        while (path.length) {
            node = node[path.pop()];
        }

        return node;
    }

    _swapValue(a, b) {
        /* Swap value of two nodes */

        let value = a.value;
        a.value = b.value;
        b.value = value;
    }
}


// Basic tests

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

queue = new PointerPriorityQueue();
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
