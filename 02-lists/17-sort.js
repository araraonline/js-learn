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

function partition(array, start, end) {
    // reorder array around pivot element (Hoare's)
    let pivot = array[Math.floor((start + end) / 2)];

    let i = start - 1, j = end + 1;
    while (true) {
        do {
            i++;
        } while (array[i] < pivot);

        do {
            j--;
        } while (array[j] > pivot);

        if (i >= j) {
            return j;
        }

        swap(array, i, j);
    }
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

function quicksort(array) {
    function _quicksort(array, start, end) {
        if (start < end) {
            let pivot = partition(array, start, end);
            _quicksort(array, start, pivot);
            _quicksort(array, pivot + 1, end);
        }
    }

    array = array.slice();
    _quicksort(array, 0, array.length - 1);
    return array;
}


console.log(quicksort([1, 2, 3, 4]));
console.log(quicksort([1, 2, 4, 3]));
console.log(quicksort([2, 1, 4, 3]));
console.log(quicksort([4, 3, 2, 1]));
