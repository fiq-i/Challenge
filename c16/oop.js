class CarFactory {

    manufacture(year) {
        let a = [];
        let b = a.concat(this.produce(HondaJazz, year))
        let c = b.concat(this.produce(HondaBrio, year))
        let manufacturedCars = c.concat(this.produce(HondaCivic, year))
        return manufacturedCars
    }

    generateNumber() {
        return Math.floor(Math.random() * 10)
    }

    produce(type, year) {
        let producedCars = [];
        let x = this.generateNumber()
        for (let i = 0; i <= x; i++) {
            let mobilku = new type(year)
            producedCars.push(mobilku)
        }
        console.log(`Telah memproduksi mobil ${type.name} sebanyak ${x+1}`)
        return producedCars
    }

    static warrantySimulation(array, simulatedYear) {
        array.forEach(element => {
            element.age = simulatedYear - element.year
            if (element.age > element.warranty) {
                console.log(`garansi mobil dengan merk ${element.name} dan id ${element.id} telah habis`)
            }
        });
    }
}

class Car {
    constructor(name, tyre, seat, door) {
        this.name = name;
        this.color = "standard white";
        this.tyre = tyre;
        this.seat = seat;
        this.door = door;
        this.age = 0;
        this.id = this.create_UUID();
    }
    create_UUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
          });
    }
}

class Tyre {
    constructor(brand, size) {
        this.brand = brand;
        this.size = size
    }
}

class HondaJazz extends Car {
    constructor(year) {
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
    constructor(year) {
        super()
        this.name = 'HondaBrio';
        this.color = 'black';
        this.tyre = new Tyre('Michellin', 6);
        this.seat = 2;
        this.door = 4;
        this.warranty = 2;
        this.year = year;
    }
}

class HondaCivic extends Car {
    constructor(year) {
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
let Honda = new CarFactory;

let mobil2021 = Honda.manufacture(2021);
console.log(mobil2021.length)
// CarFactory.warrantySimulation(mobil2021, 2025)