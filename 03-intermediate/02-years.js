function calculateLeapRule(decimalYears) {
    let result = [];
    let currentFraction = decimalYears - Math.floor(decimalYears);
    while (Math.abs(currentFraction) > 1e-6) {
        let denominator = Math.round(1 / currentFraction);
        currentFraction = currentFraction - 1 / denominator;
        result.push(denominator)
    }
    return result;
}

console.log(calculateLeapRule(200.00));
console.log(calculateLeapRule(200.25));
console.log(calculateLeapRule(200.40));
console.log(calculateLeapRule(200.42));
console.log(calculateLeapRule(200.90));
