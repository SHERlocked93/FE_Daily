import ams from '@ams-team/ams'

// 第一步，注册资源
ams.resource('demo-form1', {
    fields: {
        title: { type: 'text', label: '标题' },
        constent: { type: 'textarea', label: '内容' },
        rate: { type: 'rate', label: '评分' }
    }
})

// 第二步，注册区块
ams.block('demo', {
    type: 'form',
    ctx: 'edit',
    resource: 'demo-form1',
    style: { width: '300px' },
    operations: {
        submit: { type: 'button', label: '提交' }
    },
    actions: {
        submit() {
            console.log(this.data)
        }
    }
    // ,render:'#demo'         // 也可以通过 render 属性挂在到对应 id 属性的 DOM 节点上
})

// 第三步，渲染区块
ams.render('demo')
