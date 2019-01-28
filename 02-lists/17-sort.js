// various methods of implementing a sort
// all functions will return a new array


function swap(array, i, j) {
    // swap elements at position i and j
    let value = array[i];
    array[i] = array[j];
    array[j] = value;
}

function merge(array1, array2) {
    // merge two sorted arrays
    let merged = [];

    let i = 0, j = 0;
    while (i < array1.length && j < array2.length) {
        if (array1[i] <= array2[j]) {
            merged.push(array1[i]);
            i++;
        } else {
            merged.push(array2[j]);
            j++;
        }
    }

    while (i < array1.length) {
        merged.push(array1[i]);
        i++;
    }

    while (j < array2.length) {
        merged.push(array2[j]);
        j++;
    }

    return merged
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

function mergesort(array) {
    if (array.length <= 1) return array.slice();

    let midpoint = Math.ceil(array.length / 2);
    return merge(
        mergesort(array.slice(0, midpoint)),
        mergesort(array.slice(midpoint))
    );
}


console.log(mergesort([1, 2, 3, 4]));
console.log(mergesort([1, 2, 4, 3]));
console.log(mergesort([2, 1, 4, 3]));
console.log(mergesort([4, 3, 2, 1]));
