class List {
    constructor(size=100) {
        this.root = new EdgeNode(size);
        this.updateLength();
    }

    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error("invalid index");
        }

        return this.root.get(index);
    }

    set(index, value) {
        if (index < 0 || index >= this.length) {
            throw new Error("invalid index");
        }

        return this.root.set(index, value);
    }

    push(value) {
        this.root = this.root.push(value);
        this.updateLength();
    }

    pop() {
        if (this.length === 0) {
            throw new Error("empty list");
        }

        let result = this.root.pop();
        this.root = result.node;
        this.updateLength();
        return result.value;
    }

    updateLength() {
        this.length = this.root.length;
    }
}

class EdgeNode {
    constructor(size) {
        this.array = new Array(size);
        this.length = 0;

        this.baseSize = size;
        this.maxSize = size;
    }

    get(index) {
        return this.array[index];
    }

    set(index, value) {
        this.array[index] = value;
    }

    push(value) {
        if (this.length + 1 > this.maxSize) {
            let parent = new ParentNode(this);
            parent.push(value);
            return parent;
        } else {
            this.array[this.length] = value;
            this.length++;
            return this;
        }
    }

    pop() {
        let value = this.array[this.length - 1];
        this.length--;
        return {node: this, value};
    }
}

class ParentNode {
    constructor(child) {
        // base size used for everything
        let size = child.baseSize;

        this.children = new Array(size);
        this.children[0] = child;
        for (let i = 1; i < size; i++) {
            this.children[i] = new EdgeNode(size);
        }

        this.baseSize = size;
        this.maxSize = size * child.maxSize;

        this.length = child.length;
    }

    get(index) {
        let childSize = this.maxSize / this.baseSize;
        let child = this.children[Math.floor(index / childSize)];
        return child.get(index % childSize);
    }

    set(index, value) {
        let childSize = this.maxSize / this.baseSize;
        let child = this.children[Math.floor(index / childSize)];
        child.set(index % childSize, value);
    }

    push(value) {
        if (this.length + 1 > this.maxSize) {
            let parent = new ParentNode(this);
            parent.push(value);
            return parent;
        } else {
            let index = this.length;
            let childSize = this.maxSize / this.baseSize;
            let child = this.children[Math.floor(index / childSize)];
            this.children[Math.floor(index / childSize)] = child.push(value);

            this.length++;
            return this;
        }
    }

    pop(value) {
        if (this.length - 1 <= this.children[0].maxSize) {
            let value = this.get(this.length - 1);
            return {node: this.children[0], value};
        } else {
            let index = this.length - 1;
            let childSize = this.maxSize / this.baseSize;
            let child = this.children[Math.floor(index / childSize)];

            let result = child.pop();
            this.children[Math.floor(index / childSize)] = result.node;

            this.length--;
            return {node: this, value: result.value};
        }
    }
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            console.log(a, b);
            throw new Error();
        }
    }
    
    function checkError(f) {
        try {
            f();
        } catch(e) {
            return;
        }
        throw new Error();
    }

    let list;

    // push/length/get
    list = new List(3);
    for (let i = 0; i < 30; i++) {
        list.push(i + 1);
    }
    check(list.length, 30);
    for (let i = 0; i < 30; i++) {
        check(list.get(i), i + 1);
    }

    // push/pop
    list = new List(3);
    for (let i = 0; i < 30; i++) {
        list.push(i + 1);
    }
    for (let i = 29; i >= 0; i--) {
        check(list.pop(), i + 1);
    }
    check(list.length, 0);

    // set
    list = new List(3);
    for (let i = 0; i < 30; i++) {
        list.push(i + 1);
    }
    for (let i = 0; i < 30; i++) {
        list.set(i, i + 2);
    }
    for (let i = 0; i < 30; i++) {
        check(list.get(i), i + 2);
    }

    // bad get
    list = new List(3);
    for (let i = 0; i < 30; i++) {
        list.push(i + 1);
    }
    checkError(() => list.get(-2));
    checkError(() => list.get(-1));
    checkError(() => list.get(30));
    checkError(() => list.get(31));

    // bad set
    list = new List(3);
    for (let i = 0; i < 30; i++) {
        list.push(i + 1);
    }
    checkError(() => list.set(-2, 1));
    checkError(() => list.set(-1, 1));
    checkError(() => list.set(30, 1));
    checkError(() => list.set(31, 1));

    // bad pop
    list = new List(3);
    checkError(() => list.pop());

    console.log("tests ok");
}

tests();
