export interface IFireShow {
    singleFire():void;
    doubleFire():void;
}

export interface IWisdomShow {
    suanshuti():void
    dance():void
}

export interface IBalanceShow {
    dumuqiao():void
    zougangsi():void
}

// 判断一个对象是否拥有某种能力 类型保护函数
// 这个函数的返回类型可以帮助TS判断 ani 是否是某种类型
export function hasFireShow(ani:object):ani is IFireShow {
    if((ani as IFireShow).singleFire && (ani as IFireShow).doubleFire) {
        return true
    }else return false
}

// 3.所有会智慧表演的动物，完成智慧表演
export function hasWisdomShow(ani:object):ani is IWisdomShow {
    if((ani as IWisdomShow).suanshuti && (ani as IWisdomShow).dance){
        return true
    }else return false
}