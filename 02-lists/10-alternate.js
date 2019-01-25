function alternate(array1, array2) {
    // assume array1.length === array2.length

    let result = [];
    let i = 0;
    while (i < array1.length) {
        result.push(array1[i]);
        result.push(array2[i]);
        i += 1;
    }

    return result;
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString())
            throw new Error();
    }

    check(alternate([], []), []);
    check(alternate([1], [2]), [1, 2]);
    check(alternate([1, 3], [2, 4]), [1, 2, 3, 4]);
    check(alternate([1, 3, 5], [2, 4, 6]), [1, 2, 3, 4, 5, 6]);
    check(alternate([2, 4, 6], [1, 3, 5]), [2, 1, 4, 3, 6, 5]);

    console.log("tests ok");
}

tests();
