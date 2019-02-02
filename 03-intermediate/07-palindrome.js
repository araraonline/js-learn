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


console.log(findPalindrome(""));
console.log(findPalindrome("a"));
console.log(findPalindrome("abacate"));
console.log(findPalindrome("abbacate"));
console.log(findPalindrome("cateaba"));
console.log(findPalindrome("cateabba"));
