function checkPalindrome(string) {
    for (let i = 0; i < Math.floor(string.length / 2); i++) {
        let j = string.length - 1 - i;
        if (string[i] !== string[j]) {
            return false;
        }
    }

    return true;
}

function tests() {
    function check(a, b) {
        if (a !== b) {
            throw new Error();
        }
    }

    check(checkPalindrome(""), true);
    check(checkPalindrome("a"), true);
    check(checkPalindrome("aa"), true);
    check(checkPalindrome("aba"), true);
    check(checkPalindrome("abba"), true);
    check(checkPalindrome("abcba"), true);

    check(checkPalindrome("ab"), false);
    check(checkPalindrome("abc"), false);
    check(checkPalindrome("abca"), false);
    check(checkPalindrome("abcca"), false);
    check(checkPalindrome("abccbc"), false);

    console.log("tests ok");
}

tests();
