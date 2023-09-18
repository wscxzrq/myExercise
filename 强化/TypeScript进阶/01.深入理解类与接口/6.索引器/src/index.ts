const methodName = 'sayHello';

class User {
    constructor (
        public name:string,
        public age:number
    ) {

    }
    [methodName] () {
        console.log('a')
    }
}

const u = new User('sdf', 18)
u[methodName]();


class User2 {
    [prop:string]:any // 定义一个索引器，成员名是字符串，类型是any
    constructor(
        public name:string,
        public age:number
    ) {

    }

    sayHello() {

    }
}

const u2 = new User2('aa',22)

u2['pid'];

function test(t:any) {

}

class MyArray {
    [index:number]:string
    0 = '1'
    1 = '233'
    2 = 'wefwfw'

}

const my = new MyArray();
my[6] = '123'
console.log('my[0]',my[6])

