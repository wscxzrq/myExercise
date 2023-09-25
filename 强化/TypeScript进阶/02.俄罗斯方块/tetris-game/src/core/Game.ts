import GameConfig from "./GameConfig";
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

    constructor(private _viewer:GameViewer) {
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris);
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
     * 游戏暂停
     */
    pause() {
        if(this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
        }
    }

    /**
     * 控制游戏向左
     */
    control_left() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris,MoveDirection.left);
        }
    }

    /**
     * 控制游戏向右
     */
    control_right() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris,MoveDirection.right);
        }
    }

    /**
     * 控制游戏向下
     */
    control_dowm() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirectly(this._curTeris,MoveDirection.down);
        }
    }

    /**
     * 控制游戏向下
     */
    control_rotate() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris);
        }
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
        this.resetCenterPoint(GameConfig.panelSize.width,this._curTeris);
        this._nextTeris = createTeris({x:0,y:0});
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris);
        this._viewer.switch(this._curTeris);
        this._viewer.showNext(this._nextTeris);
    }

    /**
     * 重新设置中心点坐标,已达到让该方块出现在区域的中上方
     */
    private resetCenterPoint(width:number,teris:SquareGroup) {
        const x = Math.ceil(width / 2) - 1;
        const y = 0;
        teris.centerPoint = {x,y};

        // 判断所有小方块中是否存在纵坐标小于 0 的如果存在那么向下移动
        while(teris.squares.some(it => it.point.y < 0)) {
            teris.squares.forEach(it => it.point = {
                x:it.point.x,
                y:it.point.y + 1
            });
        }
    }
}