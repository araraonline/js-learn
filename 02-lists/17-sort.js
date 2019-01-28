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


console.log(selection([1, 2, 3, 4]));
console.log(selection([1, 2, 4, 3]));
console.log(selection([2, 1, 4, 3]));
console.log(selection([4, 3, 2, 1]));
