class VNode {
    constructor(tag, children, text) {
        this.tag = tag
        this.children = children
        this.text = text
    }

    render() {
        if (this.tag === '#text') {
            return document.createTextNode(this.text)
        }
        let el = document.createElement(this.tag)
        this.children.forEach(vChild => {
            el.appendChild(vChild.render())
        });
        return el
    }
}

function v(tag, children, text) {
    if (typeof children === 'string') {
        text = children
        children = []
    }
    return new VNode(tag, children, text)
}

let nodesDate = {
    tag: 'div',
    children: [{
            tag: 'p',
            children: [{
                tag: 'span',
                children: [{
                    tag: '#text',
                    text: 'Ada'
                }]
            }]
        },
        {
            tag: 'span',
            children: [{
                tag: '#text',
                text: 'shuai'
            }]
        }
    ]
}