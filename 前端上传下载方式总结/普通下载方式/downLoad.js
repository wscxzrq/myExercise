/**
 * Array Buffer 数组缓冲方式下载
 * 因为生成的blob url 参数只能是blob 或 file 对象，所以对于后端返回的ArrayBuffer 需要先转后
 * 成 blob 或者 file 对象然后再生成 blob url
 */
function aDownload1() {
    // 模拟后端返回 ArrayBuffer
    const str = 'hello randy!'
    let ab = new ArrayBuffer(str.length);
    console.log('ab',ab)
    // 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0。
    // 创建完后，可以以对象的方式或使用数组下标索引的方式引用数组中的元素
    let ia = new Uint8Array(ab);
    ia.forEach((item,index) => {
        item = str.charCodeAt(item);
        console.log('item',item)
    })
    console.log('ia',ia)
    const a = document.createElement('a');
    // 设置文件名为test
    a.download = 'test';
    // 将 ArrayBuffer 转后为blob 也可以转化为file
    const blob = new Blob([ia],{type:'text/plain'});
    // 生成blob Url 可以使用blob对象或者file 对象
    a.href = window.URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // 释放内存
    window.URL.revokeObjectURL(a.href);
    // 移除a元素
    document.body.removeChild(a);
}
// aDownload1();
/**
 * 后端返回blob
 * 对于后端返回blob，无需转换，直接生成blob Url
 */
function aDownload2() {
    // 模拟后端返回 Blob
    const blob = new Blob(['hello','randy'],{type:'text/plain'});

    const a = document.createElement('a');
    // 设置文件名为test
    a.download = 'test';
    // 直接生成blob Url 可以直接使用Blob 对象或者 File 对象
    a.href = window.URL.createObjectURL(blob);
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // 释放内存
    window.URL.revokeObjectURL(a.href);
    // 移除A元素
    document.body.removeChild(a);
}
/**
 * 后端返回base64
 */
async function download3() {
    // 将本地图片转换为base64 
    // const b1 = await img2base64('./imgs/logo.png');
    const b1 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEwAAAAuCAYAAACCq/96AAAAAXNSR0IArs4c6QAABLpJREFUaEPtm0lOM0cUx//Vo+32BLbbQC7AKitYfQcgEkfIPol8n1hJ9jmCpXCAbDCrrDgAH3g2Hnvujl4ZOxAxVdsS9Kd+ErKEXlFVv3pj4WIA0Gg08ufn5z/WarXvGWMK/S6VFYEoivx+v/9Pq9X6s9lszhnBajQafx0fH3+RZTnl9AyBIAhwfX39d7PZ/IG1Wq2fz87OfkthvW4rBO3i4uIXdnl5+evp6WkjNa23CbTb7SZrt9u/n5yc/PS2eqpxdXX1RwpMwA5SYAKwSDUFlgITJCConlpYCkyQgKB6amGfAVgYhvA8D/QpSRJUVeWf34LszMKiKMJiscB8Pgd8D6rEIIEhRAQvjMBUDYVCAdlsFoyxxLLbCTDf9zEYDKCFAQqaAvkZIH4YYub6CBQVlWoVSe1btwZGrjfo9VBWZejyf24XRBHCKILE2BOAth9gEkQw6/VEQtsKGMWobqeDPUWC9gBr4fmY+wEkVeNAqMOPPBcFVUFWWV0dEbRZxDi0OO5J7r9cLumeaivXVhQFmUxG6G9sBez+/h6SvUReVUBrHzku5GwO5XL5SZAnaKPRCIrnoqSrfIETx4NSKPK4Jip0UMPhcGtguq6jVCoJTR8bGJ3u3devqGdUbiVT1wceYL20Atqk5jkwVIW7a98NcHB4GMvKhHa5Q+XYwCzLgjUeoayrz25+Op2CdPL5PAzD4EvmLnx3C1PXQHlhaLsom3VediRFYgObTCaQ7QVyigLLD+DpWe6KayELpB+yvsdxiqzMCDwe8yhrKsXSBmgSoMUGNh6PoXs2MrIstPEV6CVyigxKEFEuj2KxmARWfI2xgVHAVx2LZ76554MZhU0Ad10Xs9kMjuMgl8txt6SMRPLauCRQiw2MKvpgNkFBU+GFIaaQUavVeEtEUAgSpWyKY6RbrVZ55ux0OqgqjNdn946H3H5FOLV/JNjYwHh137mDmdX5+vuWgz2zDk3TXtwP1U6L8QiVzEqnazmoH30Xq88k8JREDg4ONuMpTNAB7e/vbw6B5qQDJEtfx1hae6/X41ZvmqYQ/9jAaJZet4uiFEGTJFDrM3QDVE3z2axH7jns91HLqLzyp0RhySq3vDhCbk9JhQ5onVQIBNV8j5v99UUAFdHrsEDjaPz6YkBk/q2A0aSjXhe1zGrR5Jojx4OeM3iTTYukTdApB7aFfV2DLDFehvRsF+bB4WYTIov+SN2tgNHCqd5yZ1Ps6asClip+Jwxg+yEHQ4AysgT94T/qdLoD24VR3uNxLmmyNbA1NGs64dCUV+69uAXaHoxSKVGlxOND3Qkw3ibd3iIMAn5jQaWGRvdhjIFuLdwg5DHLoQtFWcHR0VGi2qGdA6NilC0XMDQFbhDADkJ+aUggCRpdJhJEVZIwdlwoRkG46f0srru1hfHyottB7SGGvbUximtdy0X9MHkBf6tKfw2GekPPWnLrea845Lo5A5VK5b1DPo3eTiyMah9ReVwXiY79SP2tgX3k4j9i7hSYIPUUWApMkICgeiwLo/rq5uaG3xYkWahJpyJaRGIBE5ngW9NNgQmeaAosDrD0a+fvp8a/dp4+bHgfsM3DhvTpzNvAnjydIfX0cdbL0P7/OOtfAodH/swuElIAAAAASUVORK5CYII='
    const a = document.createElement('a');
    a.download = 'test';
    // 给超链接赋值base64 也可以下载
    a.href = b1;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    // 移除超链接
    document.body.revokeObjectURL(a);
}
download3()
/**
 * ShowSaveFilePicker API 下载
 * 调用该方法会显示允许用户选择保存路径的文件选择器
 *  1、ShowSaveFilePicker 方法支持一个对象类型的可选参数 包含以下属性
 *      ExcludeAccetpAllOption 布尔类型，默认值为false。默认情况下，选择器应包含
 *      一个不应用任何文件类型过滤器的选项  将此选项设置为 true 意味着 types 选项不可用
 *  2、types:数组类型，表示允许保存的文件类型列表，数组中的每一项是包含以下属性的配置对象
 *      description(可选) 用于描述允许保存文件类型类别
 *      accept 是一个对象，该对象的 key 是 MIME 类型，值是文件扩展名
 *  3、suggestedName 建议的文件名
 */
async function download4(blob,filename) {
    try {
        const handle = await window.showSaveFilePicker({
            suggestedName: filename,
            types:[
                {
                    description: 'text file',
                    accept:{
                        "text/plain":[".txt"],
                    }
                },
                {
                    description:"jpeg file",
                    accept:{
                        "image/jpeg":[".jpg"],
                    }
                }
            ]
        })
        const writable = await handle.createWritable();
        await writable.wirte(blob);
        await writable.close();
        return handle;
    } catch (err) {
        console.log(err.name,err.message)
    }
}
function showSavePickerDownload() {
    // 模拟blob 文件
    const blob = new Blob(['hello','randy'],{type:'text/plain'});
    download4(blob,'test.txt')
}
document.getElementById('btn').addEventListener('click',function() {
    showSavePickerDownload();
})
