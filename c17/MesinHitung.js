class MesinHitung {
    //write code here

    constructor (){
        this.x = 1
    }
    
    result(){
        return console.log(this.x)
    }

    add(x){ 
         this.x = this.x + x  
         return this
    }

    substract(x){
         this.x = this.x - x
         return this
    }

    multiply(x){
        if (x == 'Pi'){
            x = 22/7
        }
         this.x = this.x * x
         return this
    }

    divide(x){
         this.x = (this.x) / x
         return this
    }

    exponent(x){
         this.x = Math.pow(this.x, x)
         return this
    }

    square(x){
         this.x = Math.pow(this.x, 2)
         return this
    }

    squareRoot(x){
         this.x = Math.sqrt(this.x)
         return this
    }
}

  export {MesinHitung};