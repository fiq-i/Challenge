function indexPrime(param1) {
    //write your code here
    let arr = [0];
    let counter = 2;
    for (let i = 2; counter <= param1 + 1; i++) {
        let isPrime = true;
        for (let k = 2; k < i; k++) {
            if (i % k == 0) {
                isPrime = false;
                break
            }
        }
        if (isPrime) {
            // arr.push(i)
            arr.splice(0, 1, i);
            counter++
        }
    }
    // return [arr[param1-1]]
    return arr
}



console.log(indexPrime(4))
console.log(indexPrime(500))
console.log(indexPrime(37786))