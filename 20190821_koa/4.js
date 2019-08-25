/**
 * 创建于 2019-08-21
 * 作者: SHERlocked93
 * 功能: hello world 程序
 */


const Koa = require('koa')
const app = new Koa()

// wrapper1
app.use(async (ctx, next) => {
    console.log(' in  wrapper1')
    const a = await next()
    console.log(' out wrapper1', a)
})

// wrapper2
app.use(async (ctx, next) => {
    console.log(' in  wrapper2')
    const b = await next()
    console.log(' out wrapper2', b)
    return 123
})

// response
app.use(async ctx => {
    ctx.body = 'Hello World'
})

app.listen(10001)
console.log('app started at port http://localhost:10001')

// 输出：  in  wrapper1
// 输出：  in  wrapper2
// 输出：  out wrapper2
// 输出：  out wrapper1

