function sentencesManipulation(sentence) {
    //write your code here
    var words = sentence.split(" ");
    let output = "";
    for (let i = 0; i < words.length; i++) {
        output += stringManipulation(words[i])
    }
    return console.log(output.slice(0, -1))
}

function stringManipulation(word) {
    //write your code here
    let vowel = ['a', "e", "i", "o", "u"];
    let result = "";
    for (let i = 0; i <= vowel.length; i++) {
        if (word[0].toLowerCase() == vowel[i]) {
            return (result = word + " ")
        }
    }
    let res = word.substr(1, [word.length]);
    res += word[0] + "nyo" + " "
    return res

}
sentencesManipulation('ibu pergi ke pasar bersama aku')