import { Game } from "../Game";
import GameConfig from "../GameConfig";
import { SquareGroup } from "../SquareGroup";
import { GameStatus, GameViewer } from "../types";
import PageConfig from "./PageConfig";
import { SquarePageViewer } from "./SquarePageViewer";
import $ from 'jquery'
// 控制显示
export class GamePageViewer implements GameViewer {
    /**
     * 游戏暂停
     */
    onGamePause(): void {
        this.msgDom.css({
            display:'flex'
        });
        this.msgDom.find('p').html('游戏暂停');
    }

    /**
     * 游戏开始
     */
    onGameStart(): void {
        this.msgDom.css({
            display:'none'
        });
    }

    /**
     * 游戏结束
     */
    onGameOver(): void {
        this.msgDom.css({
            display:'flex'
        });
        this.msgDom.find('p').html('游戏结束');
    }

    // 设置分数
    showScore(score: number): void {
        this.scoreDom.html(score.toString());
    }
    
    private nextDom = $('#next');
    private panelDom = $('#panel');
    private scoreDom = $('#score');
    private msgDom = $('#msg');

    showNext(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer = new SquarePageViewer(sq,this.nextDom);
        })
    }

    // 切换方块显示
    switch(teris: SquareGroup): void {
        teris.squares.forEach(sq => {
            sq.viewer!.remove();
            sq.viewer = new SquarePageViewer(sq,this.panelDom)
        })
    }

    init(game:Game):void {
        // 设置宽高
        this.panelDom.css({
            width:GameConfig.panelSize.width * PageConfig.SquareSize.width,
            height:GameConfig.panelSize.height * PageConfig.SquareSize.height
        })

        this.nextDom.css({
            width:GameConfig.nextSize.width * PageConfig.SquareSize.width,
            height:GameConfig.nextSize.height * PageConfig.SquareSize.height
        })

        // 注册键盘事件
        $(document).keydown((e) => {
            if(e.keyCode === 37) { // 按了左
                game.control_left();
            }else if(e.keyCode === 38) { // 按了上 旋转
                game.control_rotate();
            }else if(e.keyCode === 39) { // 按了右
                game.control_right();
            }else if(e.keyCode === 40) { // 按了下
                game.control_dowm();
            }else if(e.keyCode == 32) { // 暂停
                if(game.gameStatus === GameStatus.playing) {
                    game.pause();
                }else{
                    game.start();
                }
            }
        })
    }
}