import GameConfig from "./GameConfig";
import { Square } from "./Square";
import { SquareGroup } from "./SquareGroup";
import { createTeris } from "./Teris";
import { TerisRule } from "./TerisRule";
import { GameStatus, GameViewer, MoveDirection } from "./types";

// 游戏类
export class Game {
    // 游戏状态
    private _gameStatus:GameStatus = GameStatus.init;

    public get gameStatus() {
        return this._gameStatus;
    }

    // 当前玩家操作的方块
    private _curTeris?:SquareGroup;
    // 下一个方块
    private _nextTeris:SquareGroup;
    // 计时器
    private _timer?:number;
    // 自动下落的间隔时间
    private _duration:number = 1000;
    // 当前游戏中已存在的小方块
    private _exists:Square[] = [];
    // 积分
    private _score:number = 0;

    public get score () {
        return this._score;
    }

    public set score (val) {
        this._score = val;
        this._viewer.showScore(this._score);
    }

    constructor(private _viewer:GameViewer) {
        this._nextTeris = createTeris({x:0,y:0});
        this.createNext();
        this._viewer.init(this);
        this._viewer.showScore(this._score);
          
    }
    // 创建下一个方块
    private createNext() {
        this._nextTeris = createTeris({x:0,y:0}); // 没有实际意义，为了不让 TS代码报错
        this.resetCenterPoint(GameConfig.nextSize.width,this._nextTeris);
        this._viewer.showNext(this._nextTeris);
    }
    // 初始化 用于游戏结束后重新开始游戏
    private init() {
        this._exists.forEach(it => {
            if(it.viewer) {
                it.viewer.remove();
            }
        })
        this._exists = [];
        this.createNext();
        this._curTeris = undefined;
        this.score = 0;
        this._viewer.showScore(0);
    }

    /**
     * 游戏开始
     */
    start () {
        // 游戏状态的改变
        if(this._gameStatus === GameStatus.playing) {
            return
        }
        // 从游戏结束到开始
        if(this._gameStatus === GameStatus.over) {
            this.init();
        }
        this._gameStatus = GameStatus.playing;
        if(!this._curTeris) {
            // 给当前玩家操作的方块赋值
            this.switchTeris();
        }
        this.autoDrop();
        this._viewer.onGameStart();
    }

    /**
     * 游戏暂停
     */
    pause() {
        if(this._gameStatus === GameStatus.playing) {
            this._gameStatus = GameStatus.pause;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGamePause();
        }
    }

    /**
     * 控制游戏向左
     */
    control_left() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris,MoveDirection.left,this._exists);
        }
    }

    /**
     * 控制游戏向右
     */
    control_right() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.move(this._curTeris,MoveDirection.right,this._exists);
        }
    }

    /**
     * 控制游戏向下
     */
    control_dowm() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.moveDirectly(this._curTeris,MoveDirection.down,this._exists);
            // 发生触底
            this.hitBottom();
        }
    }

    /**
     * 控制游戏向下
     */
    control_rotate() {
        if(this._curTeris && this._gameStatus === GameStatus.playing) {
            TerisRule.rotate(this._curTeris,this._exists);
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
                if(!TerisRule.move(this._curTeris,MoveDirection.down,this._exists)) {
                    // 触底
                    this.hitBottom();
                }
            }
        },this._duration)
    }

    /**
     * 切换方块
     */
    private switchTeris() {
        this._curTeris = this._nextTeris;
        // 如果游戏结束，那么清除当前展示区域的方块
        this._curTeris.squares.forEach(it => {
            if(it.viewer) {
                it.viewer.remove();
            }
        })
        this.resetCenterPoint(GameConfig.panelSize.width,this._curTeris);
        // 有可能出问题，当前方块出现时，就已经和之前的方块重叠了
        if(!TerisRule.canImove(this._curTeris.shape,this._curTeris.centerPoint,this._exists)) {
            // 游戏结束
            this._gameStatus = GameStatus.over;
            clearInterval(this._timer);
            this._timer = undefined;
            this._viewer.onGameOver();
            return
        }
        this.createNext();
        this._viewer.switch(this._curTeris);
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
            teris.centerPoint = {
                x:teris.centerPoint.x,
                y:teris.centerPoint.y + 1
            }
        }
    }

    /**
     * 触底操作
     */
    private hitBottom() {
        // 将当前俄罗斯方块包含的小方块加入到已存在的方块数组中
        this._exists.push(...this._curTeris!.squares);
        // 处理移除
        const num = TerisRule.deleteSquares(this._exists);
        // 增加积分
        this.addScore(num);
        // 切换方块
        this.switchTeris();

    }

    /**
     * 增加积分
     * @param lineNum 消除的行数
     */
    private addScore(lineNum:number) {
        if(lineNum === 0) return
        else if(lineNum === 1) {
            this.score += 10;
        }else if(lineNum === 2) {
            this.score += 25;
        }else if(lineNum === 3) {
            this.score += 50;
        }else {
            this.score += 100;
        }
    }
}