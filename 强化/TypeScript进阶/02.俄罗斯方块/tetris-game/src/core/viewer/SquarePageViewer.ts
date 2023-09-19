import { IViewer } from '../types';
import { Square } from './../Square';
import $ from 'jquery'
import PageConfig from './PageConfig';
/**
 * 显示一个小方块到页面中
 */
export class SquarePageViewer implements IViewer{
    private dom?:JQuery<HTMLElement>
    private isRemove:boolean = false // 是否已经移除过了
    constructor (
        private Square:Square, // 小方块
        private container: JQuery<HTMLElement> // 容器
    ) {}
    show(): void {
        // 如果已经移除过了，那么不展示
        if(this.isRemove) return
        if(!this.dom) {
            // 生成dom元素并且设置不变的参数
            this.dom = $('<div>').css({
                position:'absolute',
                width:PageConfig.SquareSize.width,
                height:PageConfig.SquareSize.height,
                border:'1px solid #ccc',
                boxSizing:'border-box'
            }).appendTo(this.container)
        }
        this.dom.css({
            // 因为小方块的x y 坐标是逻辑坐标，需要进行转换成为实际的像素值，
            left:this.Square.point.x * PageConfig.SquareSize.width,
            top:this.Square.point.y * PageConfig.SquareSize.height,
            background:this.Square.color
        })
    }
    remove(): void {
        if(this.dom && !this.isRemove) {
            this.dom.remove();
            this.isRemove = true;
        }
    }
}