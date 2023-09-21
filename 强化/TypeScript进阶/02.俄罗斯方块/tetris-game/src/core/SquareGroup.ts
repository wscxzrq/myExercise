import { Square } from "./Square";
import { Point, Shape } from "./types";

/**
 * 小方块的组合类
 */
export class SquareGroup {
    private _squares:readonly Square[];

    public get squares() {
        return this._squares
    }

    public get shape() {
        return this._shape
    }
    
    public get centerPoint():Point {
        return this._centerPoint
    }

    // 移动过的小方块组的重新渲染 
    public set centerPoint(val:Point) {
        this._centerPoint = val;
        this.setSquarePoints();
    }
    constructor(
        private _shape:Shape, // 形状
        private _centerPoint:Point, // 中心点坐标
        private _color:string // 颜色
    ) {
        const arr:Square[] = [];
        // 设置小方块数组 首次进入的初始化
        this._shape.forEach(p =>{
            const sq = new Square();
            sq.color = this._color;
            // 通过中心坐标加每一个方块的位置信息，计算出真实坐标
            sq.point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
            arr.push(sq)
        })
        this._squares = arr;
        this.setSquarePoints();
    }
    /**
     * 根据中心点坐标，以及形状，设置每一个小方块的坐标
     */
    private setSquarePoints () {
        // 同时设置其他小方块对象的坐标
        this._shape.forEach((p,i) =>{
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
        })
    }
    
    protected isClock = true; // true 顺时针，false 逆时针    
    /**
     * 计算旋转后的坐标
     * @returns 
     */
    afterRotateShape():Shape {
        /**
         * 俄罗斯方块旋转规则
         *  A       D
         *D B  => C B A
         *  C
         * 
         * A:0,-1 -> 1,0
         * B:0, 0 -> 0,0
         * C:0, 1 -> -1,0
         * D:-1,0 -> 0,-1
         * 
         * 可见顺时针旋转规律为：旧 x 坐标变为 新的 y 坐标 ，旧 y 坐标 取负变为新的 x 坐标
         * 逆时针规律为：旧的 x 坐标 取负 变为新的 y 坐标，旧的 y 坐标 变为新的 x 坐标
         * 
         */
        if(this.isClock) {
            return this._shape.map(p => {
                const newP:Point = {
                    x:-p.y,
                    y:p.x
                }
                return newP
            })
        }else {
            return this._shape.map(p => {
                const newP:Point = {
                    x:p.y,
                    y:-p.x
                }
                return newP
            })
        }
    }
    /**
     * 实现旋转
     */
    rotate() {
        const newShap = this.afterRotateShape();
        this._shape = newShap;
        this.setSquarePoints();
    }
}