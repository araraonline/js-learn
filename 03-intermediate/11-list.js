// I will set up an interface for a list using a tree


class List {
    constructor(arraySize=100) {
        this.root = new ArrayTree(arraySize);
        this.length = 0;
    }

    append(value) {
        this.root = this.root.expand();
        this.root.set(this.length, value);
        this.length++;
    }

    pop() {
        let value = this.root.get(this.length - 1);
        this.root = this.root.reduce();
        this.length--;

        return value;
    }

    get(index) {
        if (index < 0 || index > this.length) {
            throw new Error("invalid index");
        }

        return this.root.get(index);
    }

    set(index, value) {
        if (index < 0 || index > this.length) {
            throw new Error("invalid index");
        }

        this.root.set(index, value);
    }
}

class List {
    constructor(arraySize=100) {
        this.length = 0;
        this.capacity = arraySize;
        this.array = new Array(arraySize);
        this.arraySize = arraySize;
    }

    // modifying the structure of the array

    append(value) {
        if (this.length + 1 > this.capacity) {
            // create new parent node and return it
            let parent = new List(this.arraySize);
            parent.length = this.length;
            parent.capacity = this.arraySize * this.capacity;
            parent.array[0] = this;
            parent.append(value);
            return parent;
        } else if (this.capacity > this.arraySize) {
            // tell one of children to append value
            let childCapacity = this.capacity / this.arraySize;
            let childIndex = Math.floor(this.length / childCapacity);
            if (!this.array[childIndex])
                this.array[childIndex] = new List(this.arraySize);
            this.array[childIndex] = this.array[childIndex].append(value);
            this.length += 1;
            return this;
        } else {
            // append value to myself
            this.array[this.length] = value;
            this.length++;
            return this;
        }
    }

    pop() {
        if (this.length - 1 <= this.capacity / this.arraySize && this.capacity > this.arraySize) {
            // revert to first child
            return this.array[0];
        } else if (this.capacity > this.arraySize) {
            // tell one of children to pop value
            let childCapacity = this.capacity / this.arraySize;
            let childIndex = Math.floor((this.length - 1) / childCapacity);
            this.array[childIndex] = this.array[childIndex].pop();
            this.length -= 1;
            return this;
        } else {
            // pop value from myself
            this.length -= 1;
            return this;
        }
    }

    // modifying values in the array

    get(index) {
        if (index < 0 || index >= this.length)
            throw new Error("invalid index");

        if (this.capacity > this.arraySize) {
            // retrieve value from child
            let childCapacity = this.capacity / this.arraySize;
            let childIndex = Math.floor(index / childCapacity);
            let child = this.array[childIndex];
            let indexInChild = index % childCapacity;
            return child.get(indexInChild);
        } else {
            // retrieve value from self
            return this.array[index];
        }
    }

    set(index, value) {
        if (index < 0 || index >= this.length)
            throw new Error("invalid index");

        if (this.capacity > this.arraySize) {
            // set value in child
            let childCapacity = this.capacity / this.arraySize;
            let childIndex = Math.floor(index / childCapacity);
            let indexInChild = index % childCapacity;
            this.array[childIndex].set(indexInChild, value);
        } else {
            // set value in self
            this.array[index] = value;
        }
    }
}

let list = new List(3);
list = list.append(1);
list = list.append(2);
list = list.append(3);
list = list.append(4);
list = list.append(5);
list = list.append(6);
list = list.append(7);
list = list.append(8);
list = list.append(9);
list = list.append(10);
list = list.append(11);
list = list.append(12);
list = list.append(13);
list = list.pop();
list = list.pop();
list = list.pop();
list = list.pop();
list = list.pop();
list.set(0, 11);
for (let i = 0; i < list.length; i++) {
    console.log(list.get(i));
}
console.log(list);
