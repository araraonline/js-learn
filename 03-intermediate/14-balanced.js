function assert(bool, message="") {
    if (!bool) {
        throw new Error(message);
    }
}

class BTree {
    /* Represents an B-tree */

    constructor(b) {
        assert(b >= 3, "b must be greater than or equal to 3");
        this.b = b; // maximum amount of children
        this.root = null;
    }

    push(key, value) {
        /* Add a key-value pair to the tree */

        if (!this.root) {
            this.root = new LeafNode(this);
            this.root = this.root.push(key, value);
            return value;
        }

        this.root = this.root.push(key, value);
        return value;
    }

    get(key) {
        /* Return the value associated with a key */

        if (!this.root) {
            return undefined;
        }
        return this.root.get(key);
    }

    delete(key) {
        /* Delete the value associated with a key (does not change the structure of the tree) */

        return this.push(key, undefined);
    }
}

class LeafNode {
    constructor(tree, parent=null) {
        this.tree = tree;
        this.keys = [];
        this.values = [];
        this.parent = null;
    }

    push(key, value) {
        for (let i = 0; i < this.keys.length; i++) {
            if (key === this.keys[i]) {
                this.values[i] = value;
                return this.tree.root;
            } else if (key < this.keys[i]) {
                this.keys = this.keys.slice(0, i).concat([key]).concat(this.keys.slice(i));
                this.values = this.values.slice(0, i).concat([value]).concat(this.values.slice(i));
                return this._overflow();
            }
        }

        this.keys.push(key);
        this.values.push(value);
        return this._overflow();
    }

    get(key) {
        for (let i = 0; i < this.keys.length; i++) {
            if (key === this.keys[i]) {
                return this.values[i];
            }
        }
        
        return undefined;
    }

    _overflow() {
        if (this.keys.length > this.tree.b - 1) {
            let midpoint = Math.ceil((this.keys.length - 1) / 2);

            let left, middle, right;

            left = new LeafNode(this.tree);
            left.keys = this.keys.slice(0, midpoint);
            left.values = this.values.slice(0, midpoint);

            middle = {key: this.keys[midpoint], value: this.values[midpoint]};

            right = new LeafNode(this.tree);
            right.keys = this.keys.slice(midpoint + 1);
            right.values = this.values.slice(midpoint + 1);

            if (!this.parent) {
                let root = new ParentNode(this.tree);
                root._forcePush(left, middle, right);
                return root;
            }

            return this.parent._forcePush(left, middle, right);
        }

        return this.tree.root;
    }
}

class ParentNode {
    constructor(tree, parent=null) {
        this.tree = tree;
        this.parent = parent;
        this.array = [];
        this.values = [];
    }

    push(key, value) {
        for (let i = 1; i < this.array.length; i += 2) {
            if (key === this.array[i]) {
                this.values[(i - 1) / 2] = value;
                return this.tree.root;
            } else if (key < this.array[i]) {
                return this.array[i - 1].push(key, value);
            }
        }

        return this.array[this.array.length - 1].push(key, value);
    }

    get(key) {
        for (let i = 1; i < this.array.length; i++) {
            if (key === this.array[i]) {
                return this.values[(i - 1) / 2];
            } else if (key < this.array[i]) {
                return this.array[i - 1].get(key);
            }
        }
        return this.array[this.array.length - 1].get(key);
    }

    _overflow() {
        if ((this.array.length - 1) / 2 + 1 > this.tree.b) {
            let midpoint = 2 * Math.ceil((this.array.length - 3) / 4) + 1;
            let valuesMidpoint = (midpoint - 1) / 2;
            let left, middle, right;

            left = new ParentNode(this.tree);
            left.array = this.array.slice(0, midpoint);
            left.values = this.values.slice(0, valuesMidpoint);

            middle = {key: this.array[midpoint], value: this.values[valuesMidpoint]};

            right = new ParentNode(this.tree);
            right.array = this.array.slice(midpoint + 1);
            right.values = this.values.slice(valuesMidpoint + 1);

            if (!this.parent) {
                let root = new ParentNode(this.tree);
                root._forcePush(left, middle, right);
                return root;
            }

            return this.parent._forcePush(left, middle, right);
        }

        return this.tree.root;
    }

    _forcePush(left, middle, right) {
        let {key, value} = middle;

        left.parent = this;
        right.parent = this;

        for (let i = 1; i < this.array.length; i += 2) {
            if (key < this.array[i]) {
                this.array = this.array.slice(0, i - 1)
                    .concat([left, middle.key, right])
                    .concat(this.array.slice(i));
                this.values = this.values.slice(0, (i - 1) / 2)
                    .concat(middle.value)
                    .concat(this.values.slice((i - 1) / 2));
                return this._overflow();
            }
        }

        this.array = this.array.slice(0, -1).concat([left, middle.key, right]);
        this.values.push(middle.value);
        return this._overflow();
    }
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            console.log(a, b);
            throw new Error();
        }
    }

    let tree;

    // ascendent push
    tree = new BTree(3);
    for (let i = 1; i <= 100; i++) {
        tree.push(i, i * 10);
    }
    for (let i = 1; i <= 100; i++) {
        check(tree.get(i), i * 10);
    }

    // descendent push
    tree = new BTree(3);
    for (let i = 100; i >= 1; i--) {
        tree.push(i, i * 10);
    }
    for (let i = 100; i >= 1; i--) {
        check(tree.get(i), i * 10);
    }

    // random push (2, 3)
    let items, random;
    items = [];
    for (let i = 1; i <= 100; i++) {
        items.push(i);
    }
    random = [];
    while (items.length) {
        let i = Math.floor(Math.random() * items.length);
        random.push(items[i]);
        items = items.slice(0, i).concat(items.slice(i + 1));
    }
    tree = new BTree(3);
    for (let i of random) {
        tree.push(i, i * 10);
    }
    for (let i of random) {
        check(tree.get(i), i * 10);
    }

    // random push (2, 4)
    items = [];
    for (let i = 1; i <= 100; i++) {
        items.push(i);
    }
    random = [];
    while (items.length) {
        let i = Math.floor(Math.random() * items.length);
        random.push(items[i]);
        items = items.slice(0, i).concat(items.slice(i + 1));
    }
    tree = new BTree(4);
    for (let i of random) {
        tree.push(i, i * 10);
    }
    for (let i of random) {
        check(tree.get(i), i * 10);
    }

    // replace
    tree = new BTree(3);
    for (let i = 1; i <= 100; i++) {
        tree.push(i, i * 10);
    }
    for (let i = 1; i <= 100; i++) {
        tree.push(i, i * 100);
    }
    for (let i = 1; i <= 100; i++) {
        check(tree.get(i), i * 100);
    }

    // delete
    tree = new BTree(3);
    for (let i = 1; i <= 100; i++) {
        tree.push(i, i * 10);
    }
    for (let i = 1; i <= 100; i++) {
        tree.delete(i);
    }
    for (let i = 1; i <= 100; i++) {
        check(tree.get(i), undefined);
    }

    // bad get
    tree = new BTree(3);
    for (let i = 1; i <= 100; i++) {
        check(tree.get(i), undefined);
    }

    console.log("tests ok");
}

tests();
