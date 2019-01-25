function on_all(array, operation) {
    let result = [];
    for (let element of array) {
        let applied = operation(element);
        result.push(applied);
    }
    return result;
}

let naturals = []
let n = 1;
while (n <= 20) {
    naturals.push(n);
    n += 1;
}

let squares = on_all(naturals, n => n * n);
on_all(squares, function(n) {console.log(n);});
