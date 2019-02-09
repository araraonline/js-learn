/* Generate the DOT representation of a graph */


// Graph code - copied from last exercise

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

// In this exercise:

function generateDot(graph) {
    /* Generate the DOT representation of graph */

    let points = graph.getPoints();
    let result = "graph {\n"

    // draw points
    for (let point of points) {
        result += `    ${point};\n`;
    }

    // draw links
    let seen = new Set();
    for (let point of points) {
        let neighbors = graph.getLinksFrom(point);
        for (let neighbor of neighbors) {
            let repr = [point, neighbor].sort().toString();
            if (seen.has(repr)) {
                continue;
            } else {
                seen.add(repr);
                result += `    ${point} -- ${neighbor};\n`;
            }
        }
    }

    result += "}\n";

    return result;
}

g = new Graph();
g.addPoint("solitary");
g.addLink("a", "b1");
g.addLink("a", "b2");
g.addLink("a", "b3");
g.addLink("a", "b4");
g.addLink("b4", "c1");
g.addLink("b4", "c2");
g.addLink("b4", "c3");
console.log(generateDot(g));
