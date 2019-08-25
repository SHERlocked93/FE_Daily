/**
 * 创建于 2019-08-21
 * 作者: SHERlocked93
 * 功能: hello world 程序
 */


const Koa = require('koa')
const app = new Koa()

// 中间件1
app.use(async (ctx, next) => {
    console.log('in 中间件1')
    await next()
    console.log('out 中间件1')
})

// 中间件2
app.use(async (ctx, next) => {
    console.log('in 中间件2')
    await next()
    console.log('out 中间件2')
})

// response
app.use(async ctx => {
    ctx.body = 'Hello World'
})

app.listen(10001)
console.log('app started at port http://localhost:10001')

// 输出：  in  中间件1
// 输出：  in  中间件2
// 输出：  out 中间件2
// 输出：  out 中间件1

