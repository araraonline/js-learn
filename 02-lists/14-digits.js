function listOfDigits(number) {
    return Array.from(String(number)).map(Number);
}

console.log(listOfDigits(2342));
