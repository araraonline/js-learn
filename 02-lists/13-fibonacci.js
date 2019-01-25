function hundredFibonacci() {
    let fibonacci = [1, 1]
    let i = 0;
    while (fibonacci.length < 100) {
        fibonacci.push(fibonacci[i] + fibonacci[i + 1]);
        i++;
    }
    console.log(i);
    return fibonacci
}

console.log(hundredFibonacci());
