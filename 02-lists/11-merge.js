function mergeSortedArrays(array1, array2) {
    let merged = [];

    let i = 0;
    let j = 0;

    while (i < array1.length && j < array2.length) {
        let element1 = array1[i];
        let element2 = array2[j];
        if (element1 <= element2) {
            merged.push(element1);
            i++;
        } else {
            merged.push(element2);
            j++;
        }
    }

    if (i === array1.length) {
        merged = merged.concat(array2.slice(j));
    } else {
        merged = merged.concat(array1.slice(i));
    }

    return merged;
}

function tests() {
    function check(a, b) {
        if (a.toString() !== b.toString()) {
            console.log(a, b);
            throw new Error();
        }
    }

    check(mergeSortedArrays([], []), []);
    check(mergeSortedArrays([1], []), [1]);
    check(mergeSortedArrays([], [1]), [1]);
    check(mergeSortedArrays([1], [1]), [1, 1]);
    check(mergeSortedArrays([1], [2]), [1, 2]);
    check(mergeSortedArrays([2], [1]), [1, 2]);
    check(mergeSortedArrays([2, 3, 6], [1, 4]), [1, 2, 3, 4, 6]);
    check(mergeSortedArrays([2, 3, 6], [1, 4, 5]), [1, 2, 3, 4, 5, 6]);

    console.log("tests ok");
}

tests();
