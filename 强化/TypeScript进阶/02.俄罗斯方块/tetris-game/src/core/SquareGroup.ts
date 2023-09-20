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

    public set centerPoint(val:Point) {
        this._centerPoint = val;
        // 同时设置其他小方块对象的坐标
        this._shape.forEach((p,i) =>{
            this._squares[i].point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
        })
    }
    constructor(
        private _shape:Shape,
        private _centerPoint:Point,
        private _color:string
    ) {
        const arr:Square[] = [];
        // 设置小方块数组
        this._shape.forEach(p =>{
            const sq = new Square();
            sq.color = this._color;
            sq.point = {
                x: this._centerPoint.x + p.x,
                y: this._centerPoint.y + p.y
            }
            arr.push(sq)
        })
        this._squares = arr;
    }
}