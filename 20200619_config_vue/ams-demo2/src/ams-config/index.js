import ams from '@ams-team/ams'

// 第一步，注册资源
ams.resource('demo-form1', {
    fields: {
        title: { type: 'text', label: '标题', props: { placeholder: '请填写标题' } },
        constent: { type: 'textarea', label: '内容' },
        rate: { type: 'rate', label: '评分' },
        id: {
            type: 'text',
            label: 'ID',
            ctx: 'edit', // 字段的展示edit, view
            default: '我是ID默认值',
            info: '左边的描述',
            desc: '下面的提示',
            rules: { required: true, message: 'ID必填' }
        }
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
