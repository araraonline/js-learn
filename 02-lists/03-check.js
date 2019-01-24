function checkInArray(element, array) {
    for (let arrayElement of array) {
        if (arrayElement === element) {
            return true;
        }
    }
    return false;
}

function tests() {
    function check(a, b) {
        if (a !== b)
            throw new Error();
    }

    check(
        checkInArray(1, []),
        false
    );

    check(
        checkInArray(1, [0]),
        false
    );

    check(
        checkInArray(1, [1]),
        true
    );

    console.log("tests ok");
}

tests();
