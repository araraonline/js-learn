// I will set up an interface for a list with a fixed memory

class List {
    constructor(memory) {
        this.array = new Array(memory);
        this.length = 0;
        this.memory = memory;
    }

    // modifying the structure of the array

    append(value) {
        if (this.memory <= this.length) {
            throw new Error("array already reached its limit");
        }
        this.array[this.length] = value;
        this.length += 1;
    }

    pop() {
        if (!this.length) {
            throw new Error("popping from empty array");
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
    list = new List(10);
    check(list.length, 0);
    list.append(1);
    list.append(2);
    check(list.length, 2);

    // append + get
    list = new List(10);
    list.append(1);
    list.append(2);
    list.append(3);
    check(list.get(0), 1);
    check(list.get(1), 2);
    check(list.get(2), 3);

    // pop
    list = new List(10);
    list.append(1);
    list.append(2);
    check(list.pop(), 2);
    check(list.pop(), 1);

    // set
    list = new List(10);
    list.append(1);
    list.append(2);
    list.set(0, 11);
    list.set(1, 12);
    check(list.get(0), 11);
    check(list.get(1), 12);

    // bad append
    list = new List(2);
    list.append(1);
    list.append(2);
    checkError(() => list.append(3));

    // bad pop
    list = new List(2);
    checkError(() => list.pop());

    // bad get
    list = new List(10);
    list.append(1);
    list.append(2);
    checkError(() => list.get(-1));
    checkError(() => list.get(2));
    checkError(() => list.get(9));
    checkError(() => list.get(10));

    // bad set
    list = new List(10);
    list.append(1);
    list.append(2);
    checkError(() => list.set(-1, 1));
    checkError(() => list.set(2, 1));
    checkError(() => list.set(9, 1));
    checkError(() => list.set(10, 1));

    console.log("tests ok");
}


tests();
