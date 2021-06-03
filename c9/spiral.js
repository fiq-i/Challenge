function spiral(param1) {
    //your code here
    let result = [];
    if (typeof param1 == 'number') {
        let arrA = [];
        for (let i = 0; i < param1; i++) {
            let arrB = [];
            for (let j = i * param1; j < param1 * (i + 1); j++) {
                arrB.push(j)
            }
            arrA.push(arrB)
        }
        
        for (let a = 0; a <= Math.floor(1+arrA.length / 2); a++) {
            let last = arrA[0].length - 1;
            for (let i = 0; i <= last; i++) {
                result.push(arrA[0][i]); //kanan
                delete (arrA[0][i])
            }

            for (let i = 1; i < last; i++) {
                result.push(arrA[i][last]); //bawah
                delete (arrA[i][last])
            }

            for (let i = last; i >= 0; i--) {
                result.push(arrA[last][i]); //kiri
                delete (arrA[last][i])
            }

            for (let i = last - 1; i > 0; i--) {
                result.push(arrA[i][0]); //atas
                delete (arrA[i][0])
            }
            let newArrA = [];
            for (i = 1; i < arrA.length -1; i++)
            {   let newArrB = [];
                for (j= 0; j < arrA[i].length; j++)
                {   
                    if (arrA[i][j]!==undefined)
                    {
                        newArrB.push(arrA[i][j])
                    }
                }
                newArrA.push(newArrB)
            }
                arrA = newArrA
                if (arrA.length == 1){
                    result.push(arrA[0][0])
                }
                //  console.log(arrA)
        }
    }
    return console.log(result)
}

spiral(5)
spiral(6)
spiral(7)