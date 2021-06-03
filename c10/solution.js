const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'tulis kalimatmu disini >'
});

rl.prompt();
rl.on('line', (line) => {

    sentencesManipulation = (sentence) => {
        if (sentence === 'close') {
            console.log('Good bye!');
            process.exit(0);
        }
        let words = sentence.split(" ");
        let output = ""
        for (let i = 0; i < words.length; i++) {
            output += stringManipulation(words[i])
        }
        return console.log(output.slice(0, -1))
    }
    stringManipulation = (word) => {
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

    
    sentencesManipulation(line.trim())
    rl.prompt();
})