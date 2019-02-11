function assert(bool, message="") {
    if (!bool) {
        throw new Error(message);
    }
}

class ABSearchTree {
    /* Represents an (a,b)-tree */

    constructor(a, b) {
        assert(a >= 2, "a must be greater than or equal to 2");
        assert(a <= (b + 1) / 2, "a must be lower than or equal to (b + 1) / 2");

        this.a = a; // minimum amount of children
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
                this.parent = new ParentNode(this.tree);
                this.parent.array = [left, middle.key, right];
                this.parent.values = [middle.value];
                return this.parent;
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
        for (let i = 1; i < this.array.values; i += 2) {
            if (key === this.array[i]) {
                this.values[(i - 1) / 2] = value;
                return this.tree.root;
            } else if (key < this.array[i]) {
                return this.array[i - 1].push(key, value);
            }
        }

        return this.array[this.array.length - 1].push(key, value);
    }

    _overflow() {
        if ((this.array.length - 1) / 2 + 1 > this.tree.b) {
            let midpoint = 2 * Math.ceil((this.array.length - 3) / 4) + 1;
            let valuesMidpoint = (midpoint - 1) / 2;
        }

        let left, middle, right;

        left = new ParentNode(this.tree);
        left.array = this.array.slice(0, midpoint);
        left.values = this.values.slice(0, valuesMidpoint);

        middle = {key: this.array[midpoint], value: this.values[valuesMidpoint]};

        right = new ParentNode(this.tree);
        right.array = this.array.slice(midpoint);
        right.values = this.values.slice(valuesMidpoint);

        if (!this.parent) {
            this.parent = new ParentNode(this.tree);
            this.parent.array = [left, middle.key, right];
            this.parent.values = [middle.value];
            return this.parent;
        }

        return this.parent._forcePush(left, middle, right);
    }

    _forcePush(left, middle, right) {
        let {key, value} = middle;
        for (let i = 1; i < this.array.length; i++) {
            if (key < this.array[i]) {
                this.array = this.array.slice(0, i + 1)
                    .concat([left, middle.key, right])
                    .concat(this.array.slice(i + 2));
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

exports.LeafNode = LeafNode;
exports.ParentNode = ParentNode;
exports.ABSearchTree = ABSearchTree;

// TODO: set parents on _overflow's
