function runningTotal(list) {
    let total = 0;
    let result = [];
    for (let element of list) {
        total += element;
        result.push(total);
    }
    return result;
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString())
            throw new Error();
    }

    check(runningTotal([]), []);
    check(runningTotal([1]), [1]);
    check(runningTotal([1, 2]), [1, 3]);
    check(runningTotal([1, 2, 3]), [1, 3, 6]);
    check(runningTotal([1, 2, 3, 4]), [1, 3, 6, 10]);

    console.log("tests ok");
}

tests();
