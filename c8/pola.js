function pola(str) {
    //write your code here
    let arr = str.split(" ");
    let num1 = arr[0];
    let angka2 = arr[2] * 1;
    let num3 = arr[4];
    for (let i = 0; i <= 9; i++) {
        let angka1 = num1.replace("#", i)
        for (let j = 0; j <= 9; j++) {
            let angka3 = num3.replace("#", j)
            if (angka3 / angka1 == angka2) {
                return [i, j]
            }
            else
                angka3 = num3
        }
        angka1 = num1
    }
}
console.log(pola("42#3 * 188 = 80#204")); //[8, 5]
console.log(pola("8#61 * 895 = 78410#5")); //[7, 9]
console.log(pola("1# * 100 = #000"));
