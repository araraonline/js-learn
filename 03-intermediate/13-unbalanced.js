/* I will provide a simple unbalanced search tree where, for each key, you may store a value */

class SearchTree {
    /* I represent a full SearchTree */

    constructor() {
        this.root = null;
    }

    put(key, value) {
        if (!this.root) {
            this.root = new Node(key, value);
        } else {
            this.root.put(key, value);
        }
    }

    get(key) {
        if (!this.root) {
            return undefined;
        } else {
            return this.root.get(key);
        }
    }

    delete(key) {
        if (!this.root) {
            return undefined;
        } else {
            return this.root.delete(key);
        }
    }
}

class Node {
    /* I represent a single node */

    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.leftChild = null;
        this.rightChild = null;
    }

    put(key, value) {
        /* Put value at my subtree */

        if (key === this.key) {
            this.value = value;
            return;
        } else if (key < this.key) {
            if (!this.leftChild) {
                this.leftChild = new Node(key, value);
                return;
            } else {
                this.leftChild.put(key, value);
                return;
            }
        } else {
            if (!this.rightChild) {
                this.rightChild = new Node(key, value);
                return;
            } else {
                this.rightChild.put(key, value);
                return;
            }
        }
    }

    get(key) {
        /* Get value from my subtree */

        if (key === this.key) {
            return this.value;
        } else if (key < this.key) {
            if (!this.leftChild) {
                return undefined;
            } else {
                return this.leftChild.get(key);
            }
        } else {
            if (!this.rightChild) {
                return undefined;
            } else {
                return this.rightChild.get(key);
            }
        }
    }

    delete(key) {
        /* Delete value from my subtree (does not change the tree structure) */

        return this.put(key, undefined);
    }
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            console.log(a, b);
            throw new Error();
        }
    }

    tree = new SearchTree();

    // basic put
    tree.put(8, 80);
    tree.put(3, 30);
    tree.put(1, 10);
    tree.put(6, 60);
    tree.put(4, 40);
    tree.put(7, 70);
    tree.put(10, 100);
    tree.put(14, 140);
    tree.put(13, 130);

    // basic get
    check(tree.get(8), 80);
    check(tree.get(3), 30);
    check(tree.get(1), 10);
    check(tree.get(6), 60);
    check(tree.get(4), 40);
    check(tree.get(7), 70);
    check(tree.get(10), 100);
    check(tree.get(14), 140);
    check(tree.get(13), 130);

    // basic delete
    tree.delete(8);
    check(tree.get(8), undefined);
    check(tree.get(3), 30);
    check(tree.get(10), 100);

    // basic replace
    tree.put(13, 140);
    check(tree.get(13), 140);

    // bad get
    check(tree.get(1e3), undefined);

    console.log("tests ok");
}

tests();
