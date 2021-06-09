function weirdMultiply(sentence) {
    sentence = sentence.toString()
    // write your code here
    if (sentence.length == 1) {
        return sentence;
    }
    else {
        let number = 1;
        for (let i = 0; i < sentence.length; i++) {
            number *= sentence[i]
        }
        return weirdMultiply(number);
    }
}

console.log(weirdMultiply(39)); //3*9=27 > 2*7=14 > 1*4 = 4
console.log(weirdMultiply(999)); //9*9*9=729 > 7*2*9=126 > 1*2*6=12 > 1*2 =2
console.log(weirdMultiply(3));//3