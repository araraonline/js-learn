function pigifyWord(word) {
    let capitalized = (word[0] === word[0].toUpperCase());
    word = word.slice(1) + word[0] + "ay";
    if (capitalized) {
        word = word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
}

function pigify(sentence) {
    let words = sentence.split(" ");
    return words.map(pigifyWord).join(" ");
}

function unpigifyWord(word) {
    let capitalized = (word[0] === word[0].toUpperCase());
    word = word[word.length - 3] + word.slice(0, -3);
    if (capitalized) {
        word = word[0].toUpperCase() + word.slice(1).toLowerCase();
    }
    return word;
}

function unpigify(sentence) {
    let words = sentence.split(" ");
    return words.map(unpigifyWord).join(" ");
}

console.log(pigify("The quick brown fox"));
console.log(unpigify("Hetay uickqay rownbay oxfay"));
