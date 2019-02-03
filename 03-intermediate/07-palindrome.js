/* I will try to find the longest palindrome of a string in the fastest manner I can */

function findPalindrome(string) {
    if (string.length === 0) return '';

    // palindrome position and size
    let pos1 = 0, pos2 = 0, size = 1;

    // find palindromes of even size
    for (let pos = 0; pos < string.length - 1; pos++) {
        let i = pos;
        let j = pos + 1;
        while (string[i] && string[i] === string[j]) {
            if (j - i + 1 > size) {
                pos1 = i;
                pos2 = j;
                size = j - i + 1;
            }
            i--;
            j++;
        }
    }

    // find palindromes of odd size
    for (let pos = 0; pos < string.length - 2; pos++) {
        let i = pos;
        let j = pos + 2;
        while (string[i] && string[i] === string[j]) {
            if (j - i + 1 > size) {
                pos1 = i;
                pos2 = j;
                size = j - i + 1;
            }
            i--;
            j++;
        }
    }

    return string.slice(pos1, pos2 + 1);
}


function tests() {
    function check(a, b) {
        if (a !== b) {
            throw new Error();
        }
    }

    check(findPalindrome(""), "");
    check(findPalindrome("a"), "a");
    check(findPalindrome("abacate"), "aba");
    check(findPalindrome("cateaba"), "aba");
    check(findPalindrome("abbacate"), "abba");
    check(findPalindrome("cateabba"), "abba");

    let str = "a".repeat(99);
    check(findPalindrome(str), str);
    check(findPalindrome(str + "a"), str + "a");

    console.log("Tests ok!");
}

function performanceTests() {
    function check(value, message) {
        let t1, t2;
        t1 = Date.now();
        findPalindrome(value);
        t2 = Date.now();
        console.log(`${message}: ${t2 - t1}ms`);
    }

    function randomString(size, alphabet="abcdefghijklmnopqrstuvwxyz") {
        let string = "";
        for (let i = 0; i < size; i++) {
            string += alphabet[Math.floor(Math.random() * alphabet.length)];
        }
        return string;
    }

    console.log("Performance checks:");
    check(randomString(1e6), "1kk-length random string (26-letter alphabet)");
    check(randomString(1e6, "abc"), "1kk-length random string (3-letter alphabet)");
    check(randomString(1e6, "ab"), "1kk-length random string (2-letter alphabet)");
    check("a".repeat(1000), "1k repeated 'a'");
    check("a".repeat(5000), "5k repeated 'a'");
}

tests();
performanceTests();
