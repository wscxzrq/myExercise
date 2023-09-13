import { Animal, Dog, Lion, Monkey, Tiger } from "./animals";
import { IFireShow } from "./interfaces";

const anmials:Animal[] = [
    new Lion('王富贵',12),
    new Tiger('坤坤',12),
    new Monkey('小六',16),
    new Dog('旺财',3),
    new Dog('狗剩',11)
];

// 1.所有动物打招呼
anmials.forEach(item => item.sayHello())

// 判断一个对象是否拥有某种能力 类型保护函数
function hasFireShow(ani:object):ani is IFireShow {
    if((ani as unknown as IFireShow).singleFire && (ani as unknown as IFireShow).doubleFire) {
        return true
    }else return false
}

// 2.所有会进行火圈表演的动物进行火圈表演
anmials.forEach(item => {
    if(hasFireShow(item)) {
        item.singleFire();
        item.doubleFire();
    }

})