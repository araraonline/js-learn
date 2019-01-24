function summation(recipe, from, to) {
    let sum = 0;
    for (let n = from; n <= to; n++) {
        let addend = recipe(n);
        sum += addend;
    }
    return sum;
}

function recipe(k) {
    let divisor = k % 2 === 0 ? -1 : 1;
    let dividend = 2 * k - 1;
    return divisor / dividend;
}

let result = 4 * summation(recipe, 1, 1e6);
console.log(result);
