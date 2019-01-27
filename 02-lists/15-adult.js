// adult knowledge that is necessary for performing digit-based operations


// addition

function ADD_INCREMENT(a) {
    if (a < 0 || a > 18) {
        throw new Error("ADD_INCREMENT argument must be between 0 and 18 (inclusive)");
    }

    return ++a;
}

function ADD_ADDDIGIT(a, b) {
    if (a < 0 || a > 9 || b < 0 || b  > 9) {
        throw new Error("ADD_ADDDIGIT arguments must be between 0 and 9 (inclusive)");
    }

    let result = a + b;
    if (result < 10) {
        return [result];
    } else {
        return [result % 10, 1];
    }
}


// subtraction

function SUB_INCREMENT(a) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_INCREMENT argument must be between 0 and 9 (inclusive)");
    }

    return ++a;
}

function SUB_INCREMENT10(a) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_INCREMENT10 argument must be between 0 and 9 (inclusive)");
    }

    return a + 10;
}

function SUB_LOWERTHAN(a, b) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_LOWERTHAN first value must be between 0 and 9 (inclusive)");
    }

    if (b < 0 || b > 10) {
        throw new Error("SUB_LOWERTHAN second value must be between 0 and 10 (inclusive)");
    }

    return a < b;
}

function SUB_SUBTRACTDIGIT(a, b) {
    if (a < 0 || a > 19) {
        throw new Error("SUB_SUBTRACTDIGIT first number must be between 0 and 19 (inclusive)");
    } else if (b < 0 || b > 10) {
        throw new Error("SUB_SUBTRACTDIGIT second number must be between 0 and 10 (inclusive)");
    }

    let result = a - b;
    if (result < 0 || result > 9) {
        throw new Error("SUB_SUBTRACTDIGIT result must be between 0 and 9 (inclusive)");
    }

    return result;
}


// multiplication

function MUL_ADDDIGIT(number, digit) {
    number = toNumber(number);

    if (number < 0 || number > 81) {
        throw new Error("SUB_ADDDIGIT number must be between 0 and 81 (inclusive)");
    } else if (digit < 0 || digit > 8) {
        throw new Error("SUB_ADDDIGIT digit must be between 0 and 8 (inclusive)");
    }

    return toDigits(number + digit);
}

function MUL_MULTIPLYDIGIT(a, b) {
    if (a < 0 || a > 9 || b < 0 || b > 9) {
        throw new Error("SUB_MULTIPLYDIGIT arguments must be between 0 and 9 (inclusive)");
    }

    let result = a * b;
    if (result < 10) {
        return [result];
    } else {
        return [result % 10, Math.floor(result / 10)]
    }
}


// some util

function toDigits(number) {
    let digits = [];
    while (number !== 0) {
        digits.push(number % 10);
        number = Math.floor(number / 10);
    }
    return digits;
}

function toNumber(digits) {
    let number = 0;
    for (let i = 0; i < digits.length; i++) {
        number += digits[i] * (10 ** i);
    }
    return number;
}


// exports

exports.ADD = {
    INCREMENT: ADD_INCREMENT,
    ADDDIGIT: ADD_ADDDIGIT,
};

exports.SUB = {
    INCREMENT: SUB_INCREMENT,
    INCREMENT10: SUB_INCREMENT10,
    LOWERTHAN: SUB_LOWERTHAN,
    SUBTRACTDIGIT: SUB_SUBTRACTDIGIT
};

exports.MUL = {
    ADDDIGIT: MUL_ADDDIGIT,
    MULTIPLYDIGIT: MUL_MULTIPLYDIGIT
};
