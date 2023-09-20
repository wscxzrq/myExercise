import { TerisRule } from './core/TerisRule';
import { Square } from "./core/Square";
import { SquareGroup } from "./core/SquareGroup";
import { LShape, createTeris } from "./core/Teris";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const teris = createTeris({x:3,y:2})


teris.squares.forEach(sq => {
    sq.viewer = new SquarePageViewer(sq,$('#root'))
})


$('#btnDown').click(function () {
    let targetPoint = {
        x:teris.centerPoint.x,
        y:teris.centerPoint.y + 1
    }
    if(TerisRule.canImove(teris.shape,targetPoint)) {
        teris.centerPoint = targetPoint
    }
})
$('#btnRight').click(function () {
    teris.centerPoint= {
        x:teris.centerPoint.x + 1,
        y:teris.centerPoint.y
    }
})
$('#btnLeft').click(function () {
    teris.centerPoint = {
        x:teris.centerPoint.x - 1,
        y:teris.centerPoint.y
    }
})