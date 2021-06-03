function spiral(param1) {
    //your code here
    let result = [];
    if (typeof param1 == 'number') {
        let arrA = [];
        for (let i = 0; i < param1; i++) {
            let arrB = [];
            for (let j = i * param1; j < param1 * (i + 1); j++) 
            {
                arrB.push(j)
            }
            arrA.push(arrB)
        }

        let last = (arrA[0].length-1);
        for (let i = 0; i <= last; i++) 
        {
            result.push(arrA[0][i]) //kanan
        }
        for (let i = 1; i < last; i++) 
        {
            result.push(arrA[i][last]) //bawah
        }
        for (let i = last; i >= 0; i--) 
        {
            result.push(arrA[last][i]) //kiri
        }
        for (let i = last-1; i > 0; i--) 
        {
            result.push(arrA[i][0]) //atas
        }
        
        temp = [];
        for (let i = 1; i < last; i++) {
            temp.push(arrA[i].splice(1,last-i))
        }
        result += [spiral(temp)]

    }
    return (result)
}

console.log(spiral(3))
// spiral(6)
// spiral(7)

