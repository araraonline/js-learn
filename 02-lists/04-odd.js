function oddArray(array) {
    let result = [];
    for (let i = 1; i < array.length; i += 2) {
        result.push(array[i]);
    }
    return result;
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString())
            throw new Error();
    }

    check(oddArray([]), []);
    check(oddArray([1]), []);
    check(oddArray([1, 2]), [2]);
    check(oddArray([1, 2, 3]), [2]);
    check(oddArray([1, 2, 3, 4]), [2, 4]);
    check(oddArray([1, 2, 3, 4, 5]), [2, 4]);

    console.log("tests ok");
}

tests();
