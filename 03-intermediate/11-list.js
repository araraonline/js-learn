class List {
    constructor(size=3) {
        this.root = new EdgeNode(size);
    }

    get(index) {
        return this.root.get(index);
    }

    set(index, value) {
        return this.root.set(index, value);
    }

    push(value) {
        this.root = this.root.push(value);
    }

    pop() {
        let result = this.root.pop();
        return result.value;
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
    let list;


    console.log("tests ok");
}

tests();
