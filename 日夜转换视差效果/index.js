const header = document.querySelector('header');
let startingPoing;
// 离开
header.addEventListener('mouseenter',(e) => {
    startingPoing = e.clientX;
    header.classList.add('moving');
})
// 进入
header.addEventListener('mouseout',(e) => {
    header.classList.remove('moving');
    header.style.setProperty('--percentage',0.5);
})
// 移动
header.addEventListener('mousemove', (e) => {
    // clientX 事件属性返回当事件被触发时鼠标指针相对于浏览器页面(或客户区)的水平坐标
    // outerWidth 整个窗口的宽度
    // 鼠标移动到最左边的时候就是0 移动到最右边的时候就是1
    let percentage = (e.clientX - startingPoing)/ window.outerWidth + 0.5; // 光标默认在中间位置
    // setProperty() 方法用于设置一个新的 CSS 属性，同时也可以修改 CSS 声明块中已存在的属性。 属性名，属性值，权重
    header.style.setProperty('--percentage',percentage); // 可以在css 中引用这个动态值
    console.log((percentage-0.25) / 0.25,'morning')
    console.log((percentage-0.5) / 0.5,'afternoon')
})
// 由于图片位置固定，所以在光标切入时图片会闪烁一下

