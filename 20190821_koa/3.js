/**
 * 创建于 2019-08-21
 * 作者: SHERlocked93
 * 功能: hello world 程序
 */


const Koa = require('koa')
const app = new Koa()

// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
    await next()
    ctx.response.type = 'text/html'
    ctx.response.body = '<h1>Hello, koa2!</h1>'
})

app.listen(10001)
console.log('app started at port http://localhost:10001')

