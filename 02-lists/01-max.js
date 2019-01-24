function max(list) {
    if (list.length === 0) return;
    if (list.length === 1) return list[0];
    let maximum = list[0];
    for (let i = 1; i < list.length; i++) {
        let elem = list[i];
        if (elem > maximum)
            maximum = elem;
    }
    return maximum;
}

function tests() {
    function check(a, b) {
        if (a !== b)
            throw new Error(`${a} and ${b} are not the same`);
    }

    check(max([]), undefined);
    check(max([1]), 1);
    check(max([1, 2]), 2);
    check(max([1, 2, 3]), 3);
    check(max([3, 2, 1]), 3);

    console.log("tests okay");
}

tests();
