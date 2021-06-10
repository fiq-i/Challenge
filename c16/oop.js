class CarFactory {
    
    // create (model, year) {
    //     switch (model){
    //         case 'HondaJazz' :
    //             return new HondaJazz(year);
    //         case 'HondaBrio' :
    //             return new HondaBrio(year);
    //         case 'HondaCivic' :
    //             return new HondaCivic(year);
    //     }
    // }
    

    manufacture(year){
        let cars = [];
        let x = Math.floor(Math.random() * 10)
        for (let i = 0; i <= x; i++){
            let mobilku = new HondaJazz(year)
            cars.push(mobilku)
        }
        console.log (`memproduksi ${x} Honda Jazz pertahun`)
        let y = Math.floor(Math.random() * 10) 
        for (let i = 0; i <= y; i++){
            let mobilku = new HondaBrio(year)
            cars.push(mobilku)
        }
        console.log (`memproduksi ${y} Honda Brio pertahun`)
        let z = Math.floor(Math.random() * 10) 
        for (let i = 0; i <= z; i++){
            let mobilku = new HondaCivic(year)
            cars.push(mobilku)
        }
        console.log (`memproduksi ${z} Honda Civic pertahun`)
        // console.log(cars)
        return cars
    }

    static addYear(array) {  // static method
        array.forEach(element => {
            element.age ++
        });
        return console.log('berhasil menambahkan tahun')
    }    
    static checkWarranty(){

    }

}

class Car {
    constructor(name, tyre, seat, door)
    {
        this.name = name;
        this.color = "standard white";
        this.tyre = tyre;
        this.seat = seat;
        this.door = door;
        this.age = 0;
        this.id = this.create_UUID();
    }
     create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }
}

class HondaJazz extends Car {
    constructor(year)
    {          
        super()
        this.name = 'HondaJazz';
        this.color = 'red';
        this.tyre = new Tyre("Dunlop", 4)
        this.seat = 4;
        this.door = 4;
        this.warranty = 5;
        this.year = year;
    }
}

class HondaBrio extends Car {
    constructor(year)
    {          
        super()
        this.name = 'HondaBrio';
        this.color = 'black';
        this.tyre = new Tyre ('Michellin', 6);
        this.seat = 2;
        this.door = 4;
        this.warranty = 2;
        this.year = year;
    }
}

class HondaCivic extends Car {
    constructor(year)
    {          
        super()
        this.name = 'HondaCivic';
        this.color = 'yellow';
        this.tyre = new Tyre("Bridgestone", 5)
        this.seat = 3;
        this.door = 4;
        this.warranty = 3;
        this.year = year;
    }
}

class Tyre {
    constructor(brand, size){
        this.brand = brand;
        this.size = size
    }
}

let Honda = new CarFactory;
// Honda.manufactureMonthly('Brio');
// let mobilku = Honda.create('HondaJazz');
// console.log(mobilku.tyre);
let mobil2021 = Honda.manufacture(2021);

CarFactory.addYear(mobil2021)
CarFactory.addYear(mobil2021)
CarFactory.addYear(mobil2021)

console.log(mobil2021)