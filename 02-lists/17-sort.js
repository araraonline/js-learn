// various methods of implementing a sort
// all functions will return a new array


function swap(array, i, j) {
    // swap elements at position i and j
    let value = array[i];
    array[i] = array[j];
    array[j] = value;
}

function selection(array) {
    array = array.slice();  // use copy
    for (let i = 0; i < array.length - 1; i++) {
        let argmin = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[argmin])
                argmin = j;
        }
        swap(array, i, argmin);
    }
    return array;
}

function insertion(array) {
    array = array.slice();
    for (let i = 0; i < array.length; i++) {
        let value = array[i];
        let j = i - 1;
        for (; array[j] > value && j >= 0; j--) {
            swap(array, j, j + 1);            
        }
        array[j + 1] = value;
    }
    return array;
}


console.log(insertion([1, 2, 3, 4]));
console.log(insertion([1, 2, 4, 3]));
console.log(insertion([2, 1, 4, 3]));
console.log(insertion([4, 3, 2, 1]));
