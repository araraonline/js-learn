/* I will try to find the longest palindrome of a string in the fastest manner I can */

function findPalindrome(string) {
    if (string.length === 0) return '';

    // palindrome position and size
    let pos1 = 0, pos2 = 0, size = 1;

    // center of string (lefty on strings of even length)
    let center;
    if (string.length % 2 === 0) {
        center = string.length / 2 - 1;
    } else {
        center = (string.length - 1) / 2;
    }

    // pointer
    let direction, distance;
    let stopLeft, stopRight;

    // find palindromes of even size
    direction = 'right';
    distance = 0;
    stopLeft = stopRight = false;
    while (!(stopLeft && stopRight)) {

        // control the pointer
        let pos;
        if (direction === 'right') {
            pos = center + distance;
            direction = 'left';
            distance += 1;
        } else {
            pos = center - distance;
            direction = 'right';
        }

        // early stop
        if (pos <= size / 2 - 1) {
            stopLeft = true;
            continue;
        }
        if (pos >= string.length - size / 2 - 1) {
            stopRight = true;
            continue;
        }

        // seek substrings
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
    direction = 'left';
    distance = 0;
    stopLeft = stopRight = false;
    while (!(stopLeft && stopRight)) {

        // control the pointer
        let pos;
        if (direction === 'left') {
            pos = center - distance;
            direction = 'right';
            distance += 1;
        } else {
            pos = center + distance;
            direction = 'left';
        }

        // early stop
        if (pos <= size / 2 - 0.5) {
            stopLeft = true;
            continue;
        }
        if (pos >= string.length - size / 2 - 0.5) {
            stopRight = true;
            continue;
        }

        // seek substrings
        let i = pos - 1;
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
    check(findPalindrome("abacote"), "aba");
    check(findPalindrome("coteaba"), "aba");
    check(findPalindrome("abbacote"), "abba");
    check(findPalindrome("coteabba"), "abba");

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

    console.log("\nPerformance checks:");
    check(randomString(1e6), "1kk-length random string (26-letter alphabet)");
    check(randomString(1e6, "abc"), "1kk-length random string (3-letter alphabet)");
    check(randomString(1e6, "ab"), "1kk-length random string (2-letter alphabet)");
    check("a".repeat(1000), "1k repeated 'a'");
    check("a".repeat(5000), "5k repeated 'a'");

    let repeated = "a".repeat(5000);
    let noise = randomString(1e5);
    console.log("\nRepeated 'a' and noise:");
    check(repeated + noise, "a + noise");
    check(noise + repeated, "noise + a");
    check(noise + repeated + noise, "noise + a + noise");
    check(repeated + noise + repeated, "a + noise + a");
    check(noise + repeated + noise + repeated + noise, "noise + a + noise + a + noise");
}

tests();
performanceTests();
