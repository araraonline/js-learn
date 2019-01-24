function isDivisible(number, by) {
    return number % by === 0;
}

function isLeapYear(year) {
    let result = false;
    if (isDivisible(year, 4))
        result = true;
    if (isDivisible(year, 100))
        result = false;
    if (isDivisible(year, 400))
        result = true;
    return result;
}


for (let found = [], year = (new Date()).getFullYear() + 1; found.length < 20; year++) {
    if (isLeapYear(year)) {
        console.log(year);
        found.push(year);
    }
}
