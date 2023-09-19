import { Square } from "./core/Square";
import { SquarePageViewer } from "./core/viewer/SquarePageViewer";
import $ from 'jquery'

const sq = new Square({x:0,y:0},'red');

sq.viewer = new SquarePageViewer(sq,$('#root'))
sq.point = {
    x:3,
    y:0
}

const sq2 = new Square({x:0,y:0},'red');
sq2.viewer = new SquarePageViewer(sq2,$('#root'))
sq2.point = {
    x:4,
    y:0
}



$('#btnDown').click(function () {
    sq.point = {
        x:sq.point.x,
        y:sq.point.y + 1
    }
})
$('#btnRemove').click(function () {
    if(sq.viewer) {
        sq.viewer.remove()
    }
})
$('#btnAdd').click(function () {
    sq.viewer = new SquarePageViewer(sq,$('#root'))
})