function copyValues(from, fromIndex, to, toIndex, count) {
    let done = 0;
    while (done < count) {
        to[toIndex] = from[fromIndex];
        fromIndex += 1;
        toIndex += 1;
        done++;
    }
}

function rotate(array, k) {
    k = k % array.length;
    let beginning = array.slice(0, k);
    copyValues(array, k, array, 0, array.length - k);
    copyValues(beginning, 0, array, array.length - k, k); 
    return array;  // for the tests
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString()) {
            throw new Error();
        }
    }

    check(rotate([], 0), []);
    check(rotate([], 1), []);
    check(rotate([], 2), []);
    check(rotate([], 3), []);
    check(rotate([1, 2, 3, 4], 0), [1, 2, 3, 4]);
    check(rotate([1, 2, 3, 4], 1), [2, 3, 4, 1]);
    check(rotate([1, 2, 3, 4], 2), [3, 4, 1, 2]);
    check(rotate([1, 2, 3, 4], 3), [4, 1, 2, 3]);
    check(rotate([1, 2, 3, 4], 4), [1, 2, 3, 4]);

    console.log("tests okay");
}

tests();
