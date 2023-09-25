import { SquareGroup } from "./SquareGroup";
import { Point, Shape } from "./types";
import { getRamdom } from "./until";

export class TShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:0,y:-1}],_centerPoint,_color);
    }
}
export class LShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:-2,y:0},{x:-1,y:0},{x:0,y:0},{x:0,y:-1}],_centerPoint,_color);
    }
}

export class LMirrorShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:2,y:0},{x:1,y:0},{x:0,y:0},{x:0,y:-1}],_centerPoint,_color);
    }
}
export class SShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:-1,y:1}],_centerPoint,_color);
    }

    // 重写父类旋转
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
export class SMirrorShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:0,y:0},{x:-1,y:0},{x:0,y:1},{x:1,y:1}],_centerPoint,_color);
    }
    // 重写父类旋转
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}
export class SquareShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:0,y:0},{x:1,y:0},{x:0,y:1},{x:1,y:1}],_centerPoint,_color);
    }

    afterRotateShape(): Shape {
        return this.shape // 直接返回当前形状
    }
}
export class LineShape extends SquareGroup{
    constructor(
        _centerPoint:Point,
        _color:string
    ) {
        // 调用父类
        super([{x:-1,y:0},{x:0,y:0},{x:1,y:0},{x:2,y:0}],_centerPoint,_color);
    }
    // 重写父类旋转
    rotate() {
        super.rotate();
        this.isClock = !this.isClock;
    }
}

export const shapes = [TShape,LShape,LMirrorShape,SShape,SMirrorShape,SquareShape,LineShape]

export const colors = ['red','pink','green','blue','orange']
/**
 * 随机产生一个俄罗斯方块 （颜色随机，形状随机）
 * @param centerPoint 
 */
export function createTeris(centerPoint:Point):SquareGroup {
    let index = getRamdom(0,shapes.length);
    const shape = shapes[index];

    index = getRamdom(0,colors.length);
    const color = colors[index]

    return new shape(centerPoint,color)
}




