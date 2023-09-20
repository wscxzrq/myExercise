import { Point, Shape } from './types';
import GameConfig from './GameConfig'
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
        // console.log('targetSquarePoints',targetSquarePoints)
        // 边界判断
        const result = targetSquarePoints.some(p => {
            console.log('p.y',p.y)
            // 判断是否超出了边界
            return (p.x < 0 || p.x > GameConfig.panelSize.width -1 )|| (p.y < 0 || p.y > GameConfig.panelSize.height -1)
        })
        console.log('result',result)
        return result ? false : true
    }
}