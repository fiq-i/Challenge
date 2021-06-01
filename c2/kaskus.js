function deretKaskus(n){
    //write code here
    let j =[];
    for (let i = 1; i<=n ;i++){
        let mul3 = i*3;
        if (mul3 % 5 == 0 && mul3 % 6 == 0){
            j.push("KASKUS")
        }
        else if (mul3 % 5 == 0)
        {
            j.push("KAS")
        }
        else if (mul3 % 6 == 0)
        {
            j.push("KUS")
        }
        else {
            j.push(mul3)
        }
    }
    return j
}
console.log(deretKaskus(10));
