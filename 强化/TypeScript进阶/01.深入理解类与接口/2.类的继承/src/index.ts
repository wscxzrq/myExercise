export class Tank {
    x:number = 0
    y:number = 0
    zidanSpeed:number = 10
    protected name:string = '坦克'
    shoot() {
        console.log('发射子弹');
    }

    sayHello() {
        console.log(`我是一个${this.name}`);
    }
}
export class PlayerTank extends Tank {
    x:number = 20
    y:number = 20
    protected name:string = '玩家坦克'
    life:number = 5
    shoot() {
        console.log('玩家坦克发射子弹');
    }
    test() {
        // 调用父类的函数
        super.sayHello();
    }
}
export class EnemyTank extends Tank {
    name:string = '地方坦克'
    health:number = 1 // 敌方坦克生命值
    shoot() {
        console.log('敌方坦克发射子弹');
    }
}
export class BoosTank extends EnemyTank {
    health: number = 3;
}

const p:Tank = new PlayerTank()
console.log('p.x',p.x)
console.log('p.y',p.y)
p.sayHello()
// 此时产生了类型保护 可以使用life属性
if(p instanceof PlayerTank) {
    console.log('p.life',p.life)
    p.test()
}

const T = new BoosTank();

