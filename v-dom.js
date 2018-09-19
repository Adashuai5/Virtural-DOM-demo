// 定义一个 VNode 类
class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.children = children
        this.text = text
    }

    render() { // render 方法，创建子元素
        if (this.tag === '#text') {
            return document.createTextNode(this.text)
        }
        let el = document.createElement(this.tag)
        this.children.forEach(vChild => {
            el.appendChild(vChild.render())
        })
        return el
    }
}
// v 构造函数，判断子元素类型
function v(tag, children, text) {
    if (typeof children === 'string') {
        text = children
        children = []
    }
    return new VNode(tag, children, text)
}

let vNode = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')])
])
const root = document.querySelector('#root')
root.appendChild(vNode.render())

