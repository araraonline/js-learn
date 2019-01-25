function sum1(array) {
    if (array.length === 0) return undefined;
    if (array.length === 1) return array[0];
    return array[0] + sum1(array.slice(1));
}

function sum2(array) {
    if (array.length === 0) return undefined;

    let sum = array[0];
    let i = 1;
    while (i < array.length) {
        sum += array[i];
        i += 1;
    }
    return sum;
}

function sum3(array) {
    if (array.length === 0) return undefined;

    let sum = array[0];
    for (let i = 1; i < array.length; i += 1) {
        sum += array[i];
    }
    return sum;
}

function tests() {
    function check(a, b) {
        if (a !== b)
            throw new Error();
    }

    check(sum1([]), undefined);
    check(sum1([1]), 1);
    check(sum1([1, 2]), 3);
    check(sum1([1, 2, 3]), 6);
    check(sum2([]), undefined);
    check(sum2([1]), 1);
    check(sum2([1, 2]), 3);
    check(sum2([1, 2, 3]), 6);
    check(sum3([]), undefined);
    check(sum3([1]), 1);
    check(sum3([1, 2]), 3);
    check(sum3([1, 2, 3]), 6);

    console.log("tests ok");
}

tests();
