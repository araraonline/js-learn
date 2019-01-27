function fromBase(digits, base) {
    let number = 0;
    for (let i = 0; i < digits.length; i++) {
        number += (base ** i) * digits[digits.length - 1 - i];
    }
    return number;
}

function toBase(number, base) {
    let digits = [];
    while (number) {
        digits.unshift(number % base);
        number = Math.floor(number / base);
    }
    return digits;
}

function fromBaseToBase(digits, from, to) {
    let number = fromBase(digits, from);
    return toBase(number, to);
}

function tests() {
    function check(a, b) {
        if (JSON.stringify(a) !== JSON.stringify(b)) {
            throw new Error();
        }
    }

    check(fromBaseToBase([1], 2, 3), [1]);
    check(fromBaseToBase([1, 0], 2, 3), [2]);
    check(fromBaseToBase([1, 1], 2, 3), [1, 0]);
    check(fromBaseToBase([1, 0, 0], 2, 3), [1, 1]);
    check(fromBaseToBase([1, 1, 1], 2, 3), [2, 1]);
    check(fromBaseToBase([2, 1, 0], 3, 10), [2, 1]);
    check(fromBaseToBase([1, 2, 3], 10, 8), [1, 7, 3]);
    check(fromBaseToBase([1, 7, 3], 8, 10), [1, 2, 3]);

    console.log("tests ok");
}

tests();
