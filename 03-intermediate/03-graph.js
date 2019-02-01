class Graph {
    addPoint(name) {
    }

    removePoint(name) {
    }

    getPoints() {
    }

    addLink(a, b) {
    }

    deleteLink(a, b) {
    }

    getLinks(from) {
    }

    setValue(element, value) {
    }

    getValue(element) {
    }
}


function tests() {
    function check(a, b) {
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            throw new Error();
        }
    }

    g = new Graph();
    g = g.addPoint("a");
    check(g.getPoints(), ["a"]);

    g = new Graph();
    g = g.addPoint("a");
    g = g.removePoint("a");
    check(g.getPoints(), []);

    g = new Graph();
    g = g.addLink("a", "b");
    check(g.getPoints(), ["a", "b"]);
    check(g.getLinks("a"), ["b"]);
    check(g.getLinks("b"), ["a"]);

    g = new Graph();
    g = g.addLink("a", "b");
    g = g.removeLink("a", "b");
    check(g.getPoints(), ["a", "b"]);
    check(g.getLinks("a"), []);
    check(g.getLinks("b"), []);

    g = new Graph();
    g = g.addLink("a", "b");
    g.setValue("a", 1);
    g.setValue("b", 2);
    g.setValue(["a", "b"], 3);
    check(g.getValue("a"), 1);
    check(g.getValue("b"), 2);
    check(g.getValue(["a", "b"]), 3);

    g = new Graph();
    d.addPoint("a");
    check(g.getValue("a"), undefined);

    g = new Graph();
    check(g.getValue("a"), null);
    check(g.getValue(["a", "b"]), null);
}
