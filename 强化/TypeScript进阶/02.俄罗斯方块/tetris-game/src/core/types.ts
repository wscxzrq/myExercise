/**
 * 约束小方块中的坐标属性
 * 添加readonly 的目的是为了防止通过 sq.point.x 方式修改坐标信息
 * x:坐标 X
 * y:坐标 Y
 */
export interface Point {
    readonly x:number,
    readonly y:number
}
// 显示者
export interface IViewer {
    show():void, // 显示函数
    remove():void // 不在显示
}

/**
 * 形状
 */
export type Shape = Point[]

// 移动方向
export enum MoveDirection {
    left,
    right,
    down
}