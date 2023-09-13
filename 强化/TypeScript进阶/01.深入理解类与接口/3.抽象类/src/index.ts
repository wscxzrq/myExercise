// 表示这个类是一个抽象类，无法再去实例化
abstract class Chess {
    x:number = 0
    y:number = 0

    // 表示这个属性也是抽象的，子类中必须实现该属性
    abstract readonly name:string;

    move(targetX:number,targetY:number):boolean {
        console.log('1.边界判断');
        console.log('2.目标位置是否己方棋子');
        // 3.棋子移动规则判断
        if(this.rule(targetX,targetY)) {
            this.x = targetX
            this.y = targetY
            console.log(`${this.name}移动成功`);
            return true
        }
        return false
    }
    protected abstract rule(targetX:number,targetY:number):boolean
}

class Horse extends Chess {
    readonly name: string = '马';
    protected rule(targetX,targetY):boolean {
        return true
    }
}

class Pao extends Chess {
    readonly name: string;
    constructor() {
        super();
        this.name = '炮'
    }
    protected rule(targetX,targetY):boolean {
        return false
    }
}

class Soldier extends Chess {
    get name () {
        return '兵'
    }
    protected rule(targetX,targetY):boolean {
        return true
    }
}

const h = new Horse()
const p = new Pao()
const s = new Soldier()

h.move(3,5)
p.move(2,3)
s.move(3,4)


class King extends Chess {
    name:string = '将'
    protected rule(targetX: number, targetY: number): boolean {
        return false
    }
}