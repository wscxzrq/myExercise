$(function () {
    // 页面完成加载之后将canvas的高度设置为视窗的高度
    $('#iphone-se').height($(window).height());
})
// 加入页面卷动时的逻辑
$(window).on('scroll',function () {
    /**
     * 获得页面卷动的百分比 到顶是0 到底是1
     * scrollHeight 是一个元素内容高度的度量的值
     * 等于该元素在不使用滚动条的情况下为了适应所用内容所需的最小高度，没有垂直滚动条的情况下scorllHeight值与元素视图填充所有内容所需要的最小值
     * clientHeight相同，包括元素的padding但不包括元素的border和margin
     */
    // 滚动条距离顶部距离 / （网页高度 - 网页可见区域高度）
    let scrolled = document.documentElement.scrollTop / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
    // Math.ceil 对一个数进行上舍入 * 84是因为有84张图片
    let frame = Math.ceil(scrolled * 84); // 第几帧
    changeFrame(frame);
    moveDevice($('#iphone-se'),scrolled,0.3,0.6,0.6,1);

    showHideText($('.left'),scrolled,0.45,0.52,0.58,0.65);
    showHideText($('.right'),scrolled,0.9,1);
    // if(scrolled <= 0.6) {
    //     if(scrolled >= 0.3) {
    //         let offsetRatio = (scrolled - 0.3) / (0.6 - 0.3);
    //         $('#iphone-se').css('left',$('#iphone-se').width() / 2 * -1 * offsetRatio);
    //     }
    // }else { // 在scrolled >0.6 的时候 将canvas 向右移动
    //     // left 会从原本负数的最左移动到正数的最右
    //     let offsetRatio = (scrolled - 0.6) / (1 - 0.6);
    //     $('#iphone-se').css('left',$('#iphone-se').width() / 2 * -1 + $('#iphone-se').width() * offsetRatio);
    // }
    
})
// PxLoader.js 可以将canvas 需要的图片预先加载
const loader = new PxLoader();
const images = [];
for(let i = 0; i < 85; i++) {
    images[i] = loader.addImage(`https://s3-us-west-2.amazonaws.com/s.cdpn.io/2002878/iphone-se.${('0' + (i + 1)).slice(-2)}.png`);
}
// 当所有图片都运行加载完成后执行这个函式
loader.addCompletionListener(function() {
    let context = $('#iphone-se')[0].getContext('2d');
    $('body').addClass('loaded');
    // 将第一张图片绘画在canvas 中
    context.drawImage(images[0],0,0,432,976);
})
// 开始下载图片
loader.start();
// 在卷动的时候转换关键帧
function changeFrame(frame) {
    let index = frame - 1;
    if(index < 0) index = 0;
    if(index > 84) index = 84;
    let context = $('#iphone-se')[0].getContext('2d');
    context.drawImage(images[index],0,0,432,976);
}
// el 元素 current 目前卷动的距离 toLeftFrom toLeftTo 代表向左移动的启始和结束
// toRightFrom,toRightTo 代表向右移动的起始和结束
function moveDevice(el,current,toLeftFrom,toLeftTo,toRightFrom,toRightTo) {
    // 当scrolled 在0.3 至 0.6 之间时 将canvas向左移动
    // 在从30帧开始 到 60帧 是动画向左旋转的过程 提供手机从背面 向左转动到 侧面一边的动画效果 此时手机的左侧面正对我们
    if(current <= toLeftTo) {
        if(current >= toLeftFrom) {
            let offsetRatio = (current - toLeftFrom) / (toLeftTo - toLeftFrom);
            $(el).css('left',$(el).width() / 2 * -1 * offsetRatio);
        }
    }else { // 在scrolled >0.6 的时候 将canvas 向右移动  60帧 到 84帧的时候动画向右移动 提供手机从左侧面向右旋转到正面的视觉效果
        // left 会从原本负数的最左移动到正数的最右
        let offsetRatio = (current - toRightFrom) / (toRightTo - toRightFrom);
        $(el).css('left',$(el).width() / 2 * -1 + $(el).width() * offsetRatio);
    }
}
// 根据scrolled 的值设置文字从什么地方开始显示从什么地方开始消失
function showHideText (el,current,showFrom,showTo,hideFrom,hideTo) {
    // 当scrolled 在0.3 至 0.6 之间时 将canvas向左移动
    if(current < showFrom) {
        $(el).css('opacity',0);
    }
    if(current >= showFrom && current <= showTo) {
        $(el).css('opacity',(current - showFrom) / (showTo - showFrom));
    }
    if(typeof hideFrom != 'undefined' && typeof hideTo !== 'undefined') {
        if(current > hideFrom && current <= hideTo) {
            $(el).css('opacity',(hideTo - current) / (hideTo - hideFrom))
        }
        if(current > hideTo) {
            $(el).css('opacity',0);
        }
    }
}