// import { TerisRule } from './core/TerisRule';
// import { Square } from "./core/Square";
// import { SquareGroup } from "./core/SquareGroup";
// import { LShape, createTeris } from "./core/Teris";
// import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'
// import { MoveDirection } from './core/types';

import { Game } from "./core/Game";
import { GamePageViewer } from "./core/viewer/GamePageViewer";

// const teris = createTeris({x:3,y:2})

// teris.squares.forEach(sq => {
//     sq.viewer = new SquarePageViewer(sq,$('#root'))
// })

// $('#btnDown').click(function () {
//     // TerisRule.move(teris,{x:teris.centerPoint.x,y:teris.centerPoint.y + 1});
//     TerisRule.move(teris,MoveDirection.down);
// })

// $('#btnRight').click(function () {
//     // TerisRule.move(teris,{x:teris.centerPoint.x + 1,y:teris.centerPoint.y});
//     TerisRule.move(teris,MoveDirection.right);
// })
// $('#btnLeft').click(function () {
//     // TerisRule.move(teris,{x:teris.centerPoint.x - 1,y:teris.centerPoint.y});
//     TerisRule.move(teris,MoveDirection.left);
// })
// $('#rotate').click(function () {
//     TerisRule.rotate(teris)
// })



// 创建一个 game 对象
var g = new Game(new GamePageViewer())
g.start();

$('#pause').click(() => {
    g.pause()
})