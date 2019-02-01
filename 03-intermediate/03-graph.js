let LINK_PREFIX = "LINK__";

class Graph {
    constructor() {
        this.links = new Map();
        this.values = new Map();
    }

    // points and edges (links)

    hasPoint(point) {
        return this.links.has(point);
    }

    hasLink(a, b) {
        return this.getLinksFrom(a).has(b);
    }

    addPoint(point) {
        if (this.hasPoint(point))
            return;

        this.links.set(point, new Set());
    }

    addLink(a, b) {
        if (this.hasLink(a, b))
            return;

        this.addPoint(a);
        this.addPoint(b);
        this.links.get(a).add(b);
        this.links.get(b).add(a);
    }

    removePoint(point) {
        if (!this.hasPoint(point))
            return;

        let neighbors = this.links.get(point);
        neighbors.forEach(n => this.removeLink(point, n));
        this.links.delete(point);
        this.removePointValue(point);
    }

    removeLink(a, b) {
        if (!this.hasLink(a, b))
            return;

        this.links.get(a).delete(b);
        this.links.get(b).delete(a);
        this.removeLinkValue(a, b);
    }

    getPoints() {
        return Array.from(this.links.keys()).sort();
    }

    getLinksFrom(point) {
        return this.links.get(point) || new Set();
    }

    // values

    setPointValue(point, value) {
        if (!this.hasPoint(point))
            return false;

        this.values.set(point, value);
        return true;
    }

    setLinkValue(a, b, value) {
        if (!this.hasLink(a, b))
            return false;

        let key = LINK_PREFIX + [a, b];
        this.values.set(key, value);
        return true;
    }

    removePointValue(point) {
        this.values.delete(point);
    }

    removeLinkValue(a, b) {
        let key = LINK_PREFIX + [a, b];
        this.values.delete(key);
    }

    getPointValue(point) {
        return this.values.get(point);
    }

    getLinkValue(a, b) {
        let key = LINK_PREFIX + [a, b];
        return this.values.get(key);
    }
}


function tests() {
    function check(a, b) {
        if (a && a.constructor === Set) {
            return check(Array.from(a).sort(), Array.from(b).sort());
        }
        
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            console.log(a, b);
            throw new Error();
        }
    }

    g = new Graph();
    g.addPoint("a");
    check(g.getPoints(), ["a"]);

    g = new Graph();
    g.addPoint("a");
    g.removePoint("a");
    check(g.getPoints(), []);

    g = new Graph();
    g.addLink("a", "b");
    check(g.getPoints(), ["a", "b"]);
    check(g.getLinksFrom("a"), new Set(["b"]));
    check(g.getLinksFrom("b"), new Set(["a"]));

    g = new Graph();
    g.addLink("a", "b");
    g.removeLink("a", "b");
    check(g.getPoints(), ["a", "b"]);
    check(g.getLinksFrom("a"), new Set([]));
    check(g.getLinksFrom("b"), new Set([]));

    g = new Graph();
    g.addLink("a", "b");
    g.setPointValue("a", 1);
    g.setPointValue("b", 2);
    g.setLinkValue("a", "b", 3);
    check(g.getPointValue("a"), 1);
    check(g.getPointValue("b"), 2);
    check(g.getLinkValue("a", "b"), 3);

    g = new Graph();
    g.addPoint("a");
    check(g.getPointValue("a"), undefined);

    g = new Graph();
    check(g.getPointValue("a"), undefined);
    check(g.getLinkValue("a", "b"), undefined);

    console.log("tests ok");
}

tests();
