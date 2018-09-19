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

function patchElement(parent, newVNode, oldVNode, index = 0) {
    if (!oldVNode) {
        parent.appendChild(newVNode.render())
    } else if (!newVNode) {
        parent.removeChild(parent.childNodes[index])
    } else if (newVNode.tag !== oldVNode.tag || newVNode.text !== oldVNode.text) {
        parent.replaceChild(newVNode.render(), parent.childNodes[index])
    } else {
        for (let i = 0; i < newVNode.children.length || i < oldVNode.children.length; i++) {
            patchElement(parent.childNodes[index], newVNode.children[i], oldVNode.children[i], i)

        }
    }
}

let vNode = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')])
])

let vNode1 = v('div', [
    v('p', [
        v('span', [v('#text', 'Ada')])
    ]),
    v('span', [v('#text', 'shuai')]),
    v('p', [v('#text', 'upload')])
])
const root = document.querySelector('#root')
patchElement(root, vNode)
// document.querySelector('.btn').onclick = function () {
// root.appendChild(vNode1.render())}
document.querySelector('.btn').onclick = function () {
    patchElement(root, vNode1, vNode)
}