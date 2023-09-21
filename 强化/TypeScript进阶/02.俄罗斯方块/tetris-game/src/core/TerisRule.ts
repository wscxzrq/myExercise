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
     * @param params 
     * @returns 
     */
    static canImove(shape:Shape,targetPoint:Point):boolean {
        // 假设，中心点已经移动到了目标位置，算出每个小方块的坐标
        const targetSquarePoints:Point[] = shape.map(it => {
            return {
                x:it.x + targetPoint.x,
                y:it.y + targetPoint.y
            }
        })
        // 边界判断
        const result = targetSquarePoints.some(p => {
            // 判断是否超出了边界
            return (p.x < 0 || p.x > GameConfig.panelSize.width -1 )|| (p.y < 0 || p.y > GameConfig.panelSize.height -1)
        })
        return result ? false : true
    }
    // 函数重载
    static move(teris:SquareGroup,targetPoint:Point):boolean;
    static move(teris:SquareGroup,direction:MoveDirection):boolean;
    // 移动函数
    static move(teris:SquareGroup,targetPointOrDirection:Point|MoveDirection):boolean {
        // 同时设置其他小方块对象的坐标

        // 这里触发了类型保护
        if(isPoint(targetPointOrDirection)) { // 传递了方向
            if(this.canImove(teris.shape,targetPointOrDirection)) {
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
            return this.move(teris,targetPoint)
        }
    }

    /**
     * 将当前方块，移动到目标方向的终点
     * @param teris 
     * @param direction 
     */
    static moveDirectly(teris:SquareGroup,direction:MoveDirection) {
        while(this.move(teris,direction)) {}
    }

    /**
     * 旋转规则
     * @param teris 方块组
     * @returns 
     */
    static rotate(teris:SquareGroup):boolean {
        const newShape = teris.afterRotateShape(); // 得到旋转后的新的形状
        if(this.canImove(newShape,teris.centerPoint)) {
            teris.rotate();
        }
        return false
    } 
}