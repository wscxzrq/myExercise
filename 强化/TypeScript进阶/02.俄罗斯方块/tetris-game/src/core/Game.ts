import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { GameStatus, GameViewer, MoveDirection } from "./types";

// 游戏类
export class Game {
    // 游戏状态
    private _gameStatus:GameStatus = GameStatus.init;
    // 当前玩家操作的方块
    private _curTeris?:SquareGroup;
    // 下一个方块
    private _nextTeris:SquareGroup = createTeris({x:0,y:0});
    // 计时器
    private _timer?:number
    // 自动下落的间隔时间
    private _duration:number = 1000

    constructor(private _viewer:GameViewer){
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 游戏开始
     */
    start () {
        // 游戏状态的改变
        if(this._gameStatus === GameStatus.playing) {
            return
        }
        this._gameStatus = GameStatus.playing;
        if(!this._curTeris) {
            // 给当前玩家操作的方块赋值
            this.switchTeris();
        }
        this.autoDrop();
    }

    /**
     * 控制方块的自由下落
     */
    private autoDrop() {
        // 如果存在计时器，或游戏状态不等于 进行中
        if(this._timer || this._gameStatus !== GameStatus.playing) {
            return
        }
        /**
         * 定时器函数在 浏览器环境与 node 环境中都存在，在浏览器环境下是number 类型，
         * 在 node 环境下 是 Timeout 类型 
         * 解决方法是将 node_modules 下的 @types 中的 node 文件夹删除
         */
        this._timer = setInterval(() => {
            if(this._curTeris) {
                TerisRule.move(this._curTeris,MoveDirection.down);
            }
        },this._duration)
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        this._nextTeris = createTeris({x:0,y:0});
        this._viewer.switch(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 重新设置中心点坐标
     */
}