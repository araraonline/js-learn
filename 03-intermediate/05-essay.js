let TEXT = `Whenever I’m TA for a introductory CS class where students learn some programming language, I have trouble coming up with good exercises. Problems from Project Euler and the like are usually much too difficult for beginners, especially if they don’t have a strong background in mathematics.

This page is a collection of progressively more difficult exercises that are suitable for people who just started learning. It will be extended as I come up with new exercises. Except for the GUI questions, exercises are generally algorithmic and should be solvable without learning any libraries. The difficulty of the exercises of course somewhat depends on the programming language you use. The List exercises for example are more complicated in languages like C that don’t have build-in support for lists.

I suppose they are also useful, although much easier, whenever an experienced person wants to learn a new language.

Learning to program means learning how to solve problems using code. Conceptually it is not very difficult to write a program that solves a problem that you can solve yourself. The skill you need to acquire is thinking very precisely about how you solve the problem and breaking it down into steps that are so simple that a computer can execute them. I encourage you to first solve a few instances of a problem by hand and think about what you did to find the solution. For example if the task is sorting lists, sort some short lists yourself. A reasonable method would be to find the smallest element, write it down and cross it out of the original list and repeat this process until you have sorted the whole list. Then you have to teach the computer 1) how to find the smallest element, 2) how to write it down, 3) how to cross it out, and wrap this in a loop. Then continue this task breakdown process until you’re confident you know how to write the necessary program.

To make good progress in your programming task, you need to test your work as early and as thoroughly as possible. Everybody makes mistakes while programming and finding mistakes in programs consumes a very large part of a programmer’s work-day. Finding a problem in a small and easy piece of code is much simpler than trying to spot it in a large program. This is why you should try to test each sub task you identified during your task-breakdown by itself. Only after you’re confident that each part works as you expect you can attempt to plug them together. Make sure you test the complete program as well, errors can creep in in the way the different parts interact. You should try to automate your tests. The easier it is to test your program, the freer you are in experimenting with changes.

The last important point is how you express your thoughts as code. In the same way that you can express the same argument in different ways in a normal English essay, you can express the same problem-solving method in different ways in code. Try for brevity. The lines that you don’t write are the lines where you can be sure that the don’t have bugs. Don’t be afraid to Google for idiomatic ways of doing the things you’d like to do (after you tried doing them yourself!). Remember that you don’t write the program for the computer, you write it for other humans (maybe a future you!). Choose names that explain things, add comments where these names don’t suffice. Never comment on what the code is doing, only write comments that explain why.
`;

class EssayGenerator {
    constructor(text) {
        this.graph = new Map();
        this.initializeGraph(text);
    }

    initializeGraph(text) {
        let words = text.split(/ /);
        for (let i = 0; i < words.length; i++) {
            let edges = this.graph.get(words[i]) || [];
            if (i + 1 < words.length) {
                edges.push(words[i + 1]);
                this.graph.set(words[i], edges);
            } else {
                this.graph.set(words[i], edges);
            }
        }
    }

    generateEssay(numberOfWords) {
        let result = [];
        let word = this.randomNode();
        for (let i = 0; i < numberOfWords; i++) {
            result.push(word);
            word = this.randomEdge(word);
            if (!word) {
                word = this.randomNode();
            }
        }
        result = result.join(' ');
        result = result.replace(/\n+ /g, '\n');
        console.log(result);
    }

    randomNode() {
        let nodes = Array.from(this.graph.keys());
        return nodes[Math.floor(Math.random() * nodes.length)];
    }

    randomEdge(node) {
        let edges = this.graph.get(node);
        if (edges) {
            return edges[Math.floor(Math.random() * edges.length)];
        }
    }
}

let generator = new EssayGenerator(TEXT);
generator.generateEssay(75);
