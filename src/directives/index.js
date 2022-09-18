// 自定义指令文件
export const imagerror = {
    inserted(dom, option) {
        // options是 指令中的变量的解释  其中有一个属性叫做 value
        // dom 表示当前指令作用的dom对象
        dom.onerror = function() {
            // 当图片出现异常的时候 会将指令配置的默认图片设置为该图片的内容
            // dom可以注册error事件
            dom.src = option.value
        }
    }
}