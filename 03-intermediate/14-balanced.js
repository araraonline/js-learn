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
                return this;
            } else if (key < this.keys[i]) {
                this.keys = this.keys.slice(0, i).concat([key]).concat(this.keys.slice(i));
                this.values = this.values.slice(0, i).concat([value]).concat(this.values.slice(i));
                return this._overflow()
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
            right.keys = this.keys.slice(midpoint);
            right.values = this.values.slice(midpoint);

            if (!parent) {
                this.parent = new ParentNode(this.tree);
                this.parent.array = [left, middle.key, right];
                this.parent.values = middle.value;
                return this.parent;
            }

            return this.parent._forcePush(left, middle, right);
        }
    }
}

class ParentNode {
    constructor(a, b) {
        this.a
    }
}
