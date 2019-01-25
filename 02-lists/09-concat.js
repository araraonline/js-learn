function concatenate(array1, array2) {
    let concatenated = new Array(array1.length + array2.length);

    let index = 0;
    for (let element of array1) {
        concatenated[index] = element;
        index++;
    }
    for (let element of array2) {
        concatenated[index] = element;
        index++;
    }

    return concatenated;
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString())
            throw new Error();
    }

    check(concatenate([], []), []);
    check(concatenate([], [1]), [1]);
    check(concatenate([1], []), [1]);
    check(concatenate([1], [1]), [1, 1]);
    check(concatenate([1], [1, 2]), [1, 1, 2]);
    check(concatenate([1, 2], [1]), [1, 2, 1]);
    check(concatenate([1, 2], [1, 2]), [1, 2, 1, 2]);

    console.log("tests ok");
}

tests();
