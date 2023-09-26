import { MoveDirection, Point, Shape } from './types';
import GameConfig from './GameConfig'
import { Square } from './Square';
import { SquareGroup } from './SquareGroup';
// 判断一个对象是不是一个坐标
function isPoint(obj:any):obj is Point {
    if(typeof obj.x === 'undefined') {
        return false
    }
    return true
}
/**
 * 俄罗斯方块的规则类
 * 该类中提供一系列的函数，根据游戏规则判断各种情况
 */

export class TerisRule {
    /**
     * 判断某个形状的方块是否可以移动到目标位置
     * @Shape 形状 
     * @targetPoint 目标坐标
     * @exists 已经存在的方块数组
     */
    static canImove(shape:Shape,targetPoint:Point,exists:Square[]):boolean {
        // 假设，中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints:Point[] = shape.map(it => {
            return {
                x:it.x + targetPoint.x,
                y:it.y + targetPoint.y
            }
        })
        // 边界判断
        let result = targetSquarePoints.some(p => {
            // 判断是否超出了边界
            return (p.x < 0 || p.x > GameConfig.panelSize.width -1 )|| (p.y < 0 || p.y > GameConfig.panelSize.height -1)
        })
        if(result) {
            return false
        }
        // 查找当前方块组的目标位置处是否已经存在方块
        result = targetSquarePoints.some(it => exists.some(i => i.point.x === it.x && i.point.y === it.y));
        if(result) {
            return false
        }
        return true
    }
    // 函数重载
    static move(teris:SquareGroup,targetPoint:Point,exists:Square[]):boolean;
    static move(teris:SquareGroup,direction:MoveDirection,exists:Square[]):boolean;
    // 移动函数
    static move(teris:SquareGroup,targetPointOrDirection:Point | MoveDirection,exists:Square[]):boolean {
        // 同时设置其他小方块对象的坐标

        // 这里触发了类型保护
        if(isPoint(targetPointOrDirection)) { // 传递了方向
            if(this.canImove(teris.shape,targetPointOrDirection,exists)) {
                teris.centerPoint = targetPointOrDirection
                return true
            }
            return false
        }else { // 传递了坐标
            const direction = targetPointOrDirection;
            let targetPoint:Point = {x:0,y:0};
            if(direction === MoveDirection.down) {
                targetPoint = {
                    x:teris.centerPoint.x,
                    y:teris.centerPoint.y + 1
                }
            }else if (direction === MoveDirection.left) {
                targetPoint = {
                    x:teris.centerPoint.x - 1,
                    y:teris.centerPoint.y
                }
            }else if (direction === MoveDirection.right) {
                targetPoint = {
                    x:teris.centerPoint.x + 1,
                    y:teris.centerPoint.y
                }
            }
            return this.move(teris,targetPoint,exists)
        }
    }

    /**
     * 将当前方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris:SquareGroup,direction:MoveDirection,exists:Square[]) {
        while(this.move(teris,direction,exists)) {}
    }

    /**
     * 旋转规则
     * @param teris 方块组
     * @returns 
     */
    static rotate(teris:SquareGroup,exists:Square[]):boolean {
        const newShape = teris.afterRotateShape(); // 得到旋转后的新的形状
        if(this.canImove(newShape,teris.centerPoint,exists)) {
            teris.rotate();
        }
        return false
    } 

   
     /**
      * 根据 Y 坐标，得到所有 Y 坐标为此值的方块
      * @param exists 已经落下的小方块数组
      * @param y  Y 坐标
      */
    private static getLineSquares(exists:Square[],y:number) {
        return exists.filter(it => it.point.y === y);
    }

    /**
     * 从已经存在的方块中进行消除，并返回消除的行数
     * @param exists 已经落下的小方块数组
     */
    static deleteSquares(exists:Square[]):number {
        // 获得 y 坐标数组
        const ys = exists.map(it => it.point.y);
        // 获取最大和最小的 y 坐标
        const maxY = Math.max(...ys);
        const minY = Math.min(...ys);
        // 循环判断 每一行是否可以消除 
        let num = 0;
        for (let y = minY; y <= maxY; y++){
            if(this.deleteLine(exists,y)) {
                num ++
            }
        }
        return num
    }

    /**
     * 消除一行
     * 如果每个小方块的 y 相同，那么说明这些小方块在游戏面板中处于同一行，
     * 如果同一行的数量等于游戏面板的宽度，说明可以消除
     * @param exists 已经落下的小方块数组
     * @param y 行号
     */
    private static deleteLine(exists:Square[],y:number):boolean {
        const squares = this.getLineSquares(exists,y);
        // 符合消除条件
        if(squares.length === GameConfig.panelSize.width) {
            squares.forEach(it => {
                // 从界面中移除
                if(it.viewer) {
                    it.viewer.remove();
                }
                // 从数组中移除
                const index = exists.indexOf(it);
                exists.splice(index,1);
            })
            // 剩下的 y 坐标比当前 y 小的方块，y+1 (y坐标是从上往下增加的)
            exists.filter(it => it.point.y < y).forEach(sq => {
                sq.point = {
                    x:sq.point.x,
                    y:sq.point.y + 1
                }
            })
            return true
        }
        return false
    }
}