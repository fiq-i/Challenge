
function romawi(n){
    const decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const numeral = ["M", "MD", "D", "DC", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    for (let i = 0; i< decimal.length; i++){
        for ( ; n >= decimal[i]; ) {
            result += numeral[i];
            n -= decimal[i];
        }
    }
    return result
}

console.log("Script Testing untuk Konversi Romawi\n");
console.log("input | expected | result");
console.log("4     |IV        |", romawi(4));
console.log("9     |IX        |", romawi(9));
console.log("13    |XIII      |", romawi(13));
console.log("1453  |MCDLIII   |", romawi(1453));
console.log("1646  |MDCXLVI   |", romawi(1646));

// function romawi (n){
//     //write your code here
//     let result ="";
//     while (n != 0){
//         switch (true){
//             case (n >= 1000):
//             n -= 1000
//             result += "M";
//             break

//             case (1000 > n && n >= 900):
//             n -= 900;
//             result += "MD" ;
//             break

//             case (900 > n && n >= 500):
//             n -= 500;
//             result += "D";
//             break

//             case (500 > n  && n >= 400):
//             n -= 400
//             result += "DC";
//             break

//             case (400 > n  && n >= 100):
//             n -= 100;
//             result += "X";
//             break

//             case (100 > n && n  >= 90):
//             n -= 90 
//             result += "CX"
//             break

//             case (90 > n  && n >= 50):
//             n -= 50
//             result += "L"
//             break

//             case (50 > n  && n >= 40):
//             n -= 40 
//             result += "LX"
//             break

//             case (40 > n  && n >= 10):
//             n -= 10
//             result += "X"
//             break

//             case (n == 9):
//             n -= 9
//             result += "IX"
//             break

//             case (9 > n && n >= 5):
//             n -= 5
//             result += "V"
//             break

//             case (4 == n) :
//             n -= 4
//             result += "IV"
//             break

//             case (4 > n >= 1) :
//             n -= 1
//             result += "I"
//             break
//         }
//     }
//     return result
// }
