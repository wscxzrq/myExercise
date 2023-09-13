// 让便签可被拖动，但不能超出视口
var moveBar = document.querySelector('.move-bar'); // 便签可拖动区域
var note = document.querySelector('.note'); // 整个便签
// 监听便笺鼠标按下
moveBar.onmousedown = function (e) {
    // 鼠标按下的坐标
    var x = e.clientX;
    var y = e.clientY;
    var rect = moveBar.getBoundingClientRect();
    // 元素的坐标
    var ex = rect.left,ey = rect.top;
    // 获取视口宽高和元素宽高
    var w = document.documentElement.clientWidth;
    var h = document.documentElement.clientHeight;
    var ew = note.offsetWidth;
    var eh = note.offsetHeight;

    // 计算最大的left 和 top 视口宽度 - 元素宽度
    var maxLeft = w - ew;
    var maxHeight = h - eh;
    // 鼠标按下后监听整个屏幕的鼠标移动
    window.onmousemove = function (e) {
        // 计算鼠标移动了多少
        var disX = e.clientX - x,disY = e.clientY - y;
        var left = ex + disX,top = ey + disY;
        
        if(left < 0) {
            left = 0;
        }
        if(left > maxLeft) {
            left = maxLeft;
        }
        if(top < 0) {
            top = 0;
        }
        if(top > maxHeight) {
            top = maxHeight;
        }
        note.style.left = left + 'px';
        note.style.top = top + 'px';
    }

    // 鼠标抬起后，不再监听鼠标移动和抬起
    window.onmouseup = function () {
        window.onmousemove = null;
        window.onmouseup = null;
    }
}