function stringManipulation(word) {
    //write your code here
    let vowel = ['a', "e", "i", "o", "u"];
    let result = "";
    for (let i = 0; i <= vowel.length; i++) {
        if (word[0].toLowerCase() == vowel[i]) {
            return console.log(word);
        }
    }
    let res = word.substr(1, [word.length]);
    res += word[0] + "nyo"
    return console.log(res)
}

stringManipulation('ayam');
stringManipulation('bebek');
stringManipulation('unta');
stringManipulation('Elang');
stringManipulation('macan tutul');