// adult knowledge that is necessary for performing digit-based operations


// addition

ADD_INCREMENT = function(a) {
    if (a < 0 || a > 18) {
        throw new Error("ADD_INCREMENT argument must be between 0 and 18 (inclusive)");
    }

    return ++a;
};

ADD_ADDDIGIT = function(a, b) {
    if (a < 0 || a > 9 || b < 0 || b  > 9) {
        throw new Error("ADD_ADDDIGIT arguments must be between 0 and 9 (inclusive)");
    }

    let result = a + b;
    if (result < 10) {
        return [result];
    } else {
        return [result % 10, 1];
    }
};


// subtraction

SUB_INCREMENT = function(a) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_INCREMENT argument must be between 0 and 9 (inclusive)");
    }

    return ++a;
}

SUB_INCREMENT10 = function(a) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_INCREMENT10 argument must be between 0 and 9 (inclusive)");
    }

    return a + 10;
}

SUB_LOWERTHAN = function(a, b) {
    if (a < 0 || a > 9) {
        throw new Error("SUB_LOWERTHAN first value must be between 0 and 9 (inclusive)");
    }

    if (b < 0 || b > 10) {
        throw new Error("SUB_LOWERTHAN second value must be between 0 and 10 (inclusive)");
    }

    return a < b;
};

SUB_SUBTRACTDIGIT = function(a, b) {
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

exports.ADD = {
    INCREMENT: ADD_INCREMENT,
    ADDDIGIT: ADD_ADDDIGIT,
}

exports.SUB = {
    INCREMENT: SUB_INCREMENT,
    INCREMENT10: SUB_INCREMENT10,
    LOWERTHAN: SUB_LOWERTHAN,
    SUBTRACTDIGIT: SUB_SUBTRACTDIGIT
}
