function frame(lines) {
    let width = Math.max(...lines.map(s => s.length));

    let topBorder = "";
    for (let i = 0; i < width + 4; i++) {
        topBorder += "*";
    }
    console.log(topBorder);

    for (let line of lines) {
        let result = "* " + line;
        for (let i = 0; i < width - line.length; i++) {
            result += " ";
        }
        result += " *";
        console.log(result);
    }

    console.log(topBorder);
}

frame(["Hello", "World", "in", "a", "frame"]);
