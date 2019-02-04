// I will set up an interface for a list that can grow in size


const MEMORY_MIN_SIZE = 10;

class List {
    constructor() {
        this.array = new Array(MEMORY_MIN_SIZE);
        this.memory = MEMORY_MIN_SIZE;
        this.length = 0;
    }

    // modifying the structure of the array

    append(value) {
        // double the size of memory if needed
        if (this.length + 1 > this.memory) {
            let newArray = new Array(this.memory * 2);
            let oldArray = this.array;
            for (let i = 0; i < this.length; i++) {
                newArray[i] = oldArray[i];
            }
            this.array = newArray;
            this.memory *= 2;
        }

        this.array[this.length] = value;
        this.length += 1;
    }

    pop() {
        if (!this.length) {
            throw new Error("list is empty");
        }

        // halve the size of memory if too big
        if (this.length - 1 < this.memory / 4 && this.memory / 2 >= MEMORY_MIN_SIZE) {
            let newArray = new Array(this.memory / 2);
            let oldArray = this.array;
            for (let i = 0; i < this.length; i++) {
                newArray[i] = oldArray[i];
            }
            this.array = newArray;
            this.memory /= 2;
        }
        this.length -= 1;
        return this.array[this.length];
    }

    // modifying values in the array

    get(index) {
        if (index < 0) {
            throw new Error("invalid index");
        } else if (index >= this.length) {
            throw new Error("index too big");
        }
        return this.array[index];
    }

    set(index, value) {
        if (index < 0) {
            throw new Error("invalid index");
        } else if (index >= this.length) {
            throw new Error("index too big");
        }
        this.array[index] = value;
    }
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            throw new Error();
        }
    }

    function checkError(f) {
        try {
            f()
        } catch(e) {
            return;
        }
        throw new Error();
    }

    let list;

    // length
    list = new List();
    check(list.length, 0);
    list.append(1);
    list.append(2);
    check(list.length, 2);

    // append + get
    list = new List();
    list.append(1);
    list.append(2);
    list.append(3);
    check(list.get(0), 1);
    check(list.get(1), 2);
    check(list.get(2), 3);

    // pop
    list = new List();
    list.append(1);
    list.append(2);
    check(list.pop(), 2);
    check(list.pop(), 1);

    // set
    list = new List();
    list.append(1);
    list.append(2);
    list.set(0, 11);
    list.set(1, 12);
    check(list.get(0), 11);
    check(list.get(1), 12);

    // grow array
    list = new List();
    for (let n = 0; n < 10; n++)
        list.append(n);
    check(list.length, 10);
    check(list.memory, 10);
    list.append(1);
    check(list.length, 11);
    check(list.memory, 20);

    // shrink array
    list = new List();
    for (let n = 0; n < 80; n++)
        list.append(n);
    for (let n = 0; n < 60; n++)
        list.pop();
    check(list.length, 20);
    check(list.memory, 80);
    list.pop();
    check(list.length, 19);
    check(list.memory, 40);

    // bad pop
    list = new List();
    checkError(() => list.pop());

    // bad get
    list = new List();
    list.append(1);
    list.append(2);
    checkError(() => list.get(-1));
    checkError(() => list.get(2));
    checkError(() => list.get(9));
    checkError(() => list.get(10));

    // bad set
    list = new List();
    list.append(1);
    list.append(2);
    checkError(() => list.set(-1, 1));
    checkError(() => list.set(2, 1));
    checkError(() => list.set(9, 1));
    checkError(() => list.set(10, 1));

    console.log("tests ok");
}

tests();
