function sum(a, b, c, d, e){
    //write code here
    let result = 0;
    for (let i = 0; i<arguments.length; i++){
        result += arguments[i];
    }
    console.log (result)
}

sum (1,2,7);
sum (1,4);
sum (11);
sum (10,3,6,7,9);
