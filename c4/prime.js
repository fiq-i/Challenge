function indexPrime(param1){
    //write your code here
    let arr = [];
    for (let i=2; arr.length<=param1 ;i++)
    {
        let isPrime = true;
        for (let k = 2; k < i; k++) 
        {
            if (i % k == 0) 
            {
                isPrime = false;
                break
            }   
        }       
        if (isPrime)
        {
            arr.push(i)
        }
    }
    return arr[param1-1]
}



console.log(indexPrime(1))
console.log(indexPrime(500))
console.log(indexPrime(37786))

