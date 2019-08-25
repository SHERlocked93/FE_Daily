/**
 * 创建于 2019-08-21
 * 作者: SHERlocked93
 * 功能: hello world 程序
 */


const Koa = require('koa')
const app = new Koa()
const axios = require('axios')

// wrapper1
app.use(async (ctx, next) => {
    console.log('in  中间件1')
    const a = await next()
    const r = ctx.r
    console.log('out 中间件1', r)
})

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    console.log('in 中间件2')
    
    const start = Date.now()
    const res = await axios.get('http://7yue.pro')
    const end = Date.now()
    
    ctx.r = end - start
    await next()
    console.log('out 中间件2')
})

app.listen(10001)
console.log('app started at port http://localhost:10001')

