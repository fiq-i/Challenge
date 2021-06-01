var x = [];
for (var i = 2; i < 30; i++) {
    let isPrima = true;
    for (k = 2; k < i; k++) {
        if (i % k == 0) {
            isPrima = false;
            break
        }
    }       
    if (isPrima){
        x.push(i)
    }
}
console.log(x);

// var x = [];
// var i = 2;
// while (i <= 30){
//     var j = 2
//     while (j < i){
//         if (i % j == 0){
//             break
//         }
//         j++
//     }
//     i++
// }

// console.log(x);
