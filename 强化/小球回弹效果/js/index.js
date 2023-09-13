// 让小球向右下运动，遇到边缘后反弹

// 每隔一段时间（20ms）,改变小球的left 和 top
var ball = document.querySelector('.ball');
var disX = 10,disY = 10;
var w = document.documentElement.clientWidth;
var h = document.documentElement.clientHeight;
var ew = ball.clientWidth;
var eh = ball.clientHeight;

// 计算最大横纵坐标
var maxLeft = w - ew;
var maxTop = h - eh;

function getRandom(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
// 改变背景颜色
function changeBg() {
    ball.style.backgroundColor = `rgb(${getRandom(0,200)},${getRandom(0,200)},${getRandom(0,200)})`
}
setInterval(function() {
    var rect = ball.getBoundingClientRect();
    var x = rect.left;
    var y = rect.top;
    var left = x + disX;
    var top = y + disY;

    // 控制范围
    if(left > maxLeft) {
        left = maxLeft;
        disX = -disX;
        changeBg();
    }
    if(left < 0) {
        left = 0;
        disX = -disX;
        changeBg();
    }
    if(top > maxTop) {
        top = maxTop;
        disY = -disY;
        changeBg();
    }
    if(top < 0) {
        top = 0;
        disY = -disY;
        changeBg();
    }
    ball.style.left = left + 'px';
    ball.style.top = top + 'px';
},20)