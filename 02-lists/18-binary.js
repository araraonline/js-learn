function binarySearch(element, array, start=0, end=array.length - 1) {
    let length = end - start + 1;
    if (length <= 0) return -1;

    let midpoint = start + Math.floor((length - 1) / 2);
    if (array[midpoint] === element) {
        return midpoint
    } else if (element < array[midpoint]) {
        return binarySearch(element, array, start, midpoint - 1);
    } else {
        return binarySearch(element, array, midpoint + 1, end);
    }
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            throw new Error();
        }
    }

    function randomElement(array) {
        let pos = Math.floor(Math.random() * array.length);
        return array[pos];
    }


    check(binarySearch(0, []), -1);
    check(binarySearch(0, [1, 2, 3, 4]), -1);

    check(binarySearch(1, [1, 2, 3, 4]), 0);
    check(binarySearch(2, [1, 2, 3, 4]), 1);
    check(binarySearch(3, [1, 2, 3, 4]), 2);
    check(binarySearch(4, [1, 2, 3, 4]), 3);

    for (let count = 1; count <= 100; count++) {

        // create sorted array
        let array = new Array(count);
        for (let i = 0; i < count; i++) {
            array[i] = Math.floor(Math.random() * 100) + 1;
        }
        array = array.sort((a, b) => a - b);

        element = randomElement(array);
        check(array[binarySearch(element, array)], element);

    }

    console.log("tests ok");
}

tests();
