/* Utils for converting from and to morse code */

TO_MORSE = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
}

FROM_MORSE = {
    ".-": "A",
    "-...": "B",
    "-.-.": "C",
    "-..": "D",
    ".": "E",
    "..-.": "F",
    "--.": "G",
    "....": "H",
    "..": "I",
    ".---": "J",
    "-.-": "K",
    ".-..": "L",
    "--": "M",
    "-.": "N",
    "---": "O",
    ".--.": "P",
    "--.-": "Q",
    ".-.": "R",
    "...": "S",
    "-": "T",
    "..-": "U",
    "...-": "V",
    ".--": "W",
    "-..-": "X",
    "-.--": "Y",
    "--..": "Z",
    "-----": "0",
    ".----": "1",
    "..---": "2",
    "...--": "3",
    "....-": "4",
    ".....": "5",
    "-....": "6",
    "--...": "7",
    "---..": "8",
    "----.": "9",
}


function toMorseCode(string) {
    /* Converts string to morse code */

    function _toMorseCode(word) {
        return word
            .split("")
            .map(c => TO_MORSE[c.toUpperCase()] || "#")
            .join(" ");
    }

    return string
        .split(" ")
        .map(_toMorseCode)
        .join("   ");
}

function fromMorseCode(string) {
    /* Convert string from morse code */

    function _fromMorseCode(word) {
        return word
            .split(" ")
            .map(morse => FROM_MORSE[morse] || "#")
            .join("");
    }

    return string
        .split("   ")
        .map(_fromMorseCode)
        .join(" ");
}


console.log(fromMorseCode(".- .- .-"));
console.log(fromMorseCode(".- -... .-"));
console.log(fromMorseCode(".-   .- .-"));
console.log(fromMorseCode("* -... .-"));
console.log(fromMorseCode("- .... .   --.- ..- .. -.-. -.-   -... .-. --- .-- -.   ..-. --- -..-"));

console.log(toMorseCode("aaa"));
console.log(toMorseCode("aba"));
console.log(toMorseCode("a aa"));
console.log(toMorseCode("*ba"));
console.log(toMorseCode("The quick brown fox"));
