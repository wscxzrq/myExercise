import { Animal, Dog, Lion, Monkey, Tiger } from "./animals";
import { IFireShow, IWisdomShow, hasFireShow, hasWisdomShow } from "./interfaces";

const anmials:Animal[] = [
    new Lion('王富贵',12),
    new Tiger('坤坤',12),
    new Monkey('小六',16),
    new Dog('旺财',3),
    new Dog('狗剩',11)
];

// 1.所有动物打招呼
anmials.forEach(item => item.sayHello())



// 2.所有会进行火圈表演的动物进行火圈表演
anmials.forEach(item => {
    if(hasFireShow(item)) {
        item.singleFire();
        item.doubleFire();
    }

})


anmials.forEach(item => {
    if(hasWisdomShow(item)) {
        item.suanshuti()
        item.dance()
    }
})

class A {
    a1:string = ''
    a2:string = ''
    a3:string = ''
}

class B {
    b1:number = 0
    b2:number = 0
    b3:number = 0
}

// 接口继承类，并且可以实现多继承，
interface C extends A,B{}

// 变量c被接口C所约束，变量c中必须要拥有接口C规定的所有成员
const c:C = {
    a1: "",
    a2: "",
    a3: "",
    b1: 0,
    b2: 0,
    b3: 0
}