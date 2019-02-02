/* Print prime numbers while it finds them */

let foundPrimes = [];
function isPrime(number) {
    for (let divisor of foundPrimes) {
        if (number % divisor === 0) {
            return false;
        }
    }
    foundPrimes.push(number);
    return true;
}

for (let n = 2;; n++) {
    if (isPrime(n)) {
        console.log(n);
    }
}
