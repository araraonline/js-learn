function reverseArray(array) {
    for (let i = 0; i < Math.floor(array.length / 2); i++) {
        let j = array.length -1 - i;
        let elem1 = array[i];
        array[i] = array[j];
        array[j] = elem1;
    }
}

function tests() {
    function check(array) {
        console.log(array);
        reverseArray(array);
        console.log(array);
    }

    check([]);
    check([1]);
    check([1, 2]);
    check([1, 2, 3]);
    check([1, 2, 3, 4]);
}

tests();
