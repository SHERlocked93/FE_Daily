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
    await new Promise((resolve, reject) => {
          ctx.zjj_start2 = Date.now()
          setTimeout(() => resolve(), 1000 + Math.random() * 1000)
      }
    )
    await next()
    const duration = Date.now() - ctx.zjj_start2
    console.log('out 中间件2 耗时：' + duration + 'ms')
})

// 中间件3
app.use(async (ctx, next) => {
    console.log('in 中间件3')
    await new Promise((resolve, reject) => {
          ctx.zjj_start3 = Date.now()
          setTimeout(() => resolve(), 1000 + Math.random() * 1000)
      }
    )
    await next()
    const duration = Date.now() - ctx.zjj_start3
    console.log('out 中间件3 耗时：' + duration + 'ms')
})

// response
app.use(async ctx => {
    console.log(' ... 业务逻辑处理过程 ... ')
})

app.listen(10001)
console.log('app started at port http://localhost:10001')

// 输出：  in 中间件1
// 输出：  in 中间件2
// 输出：  in 中间件3
// 输出：   ... 业务逻辑处理过程 ...
// 输出：  out 中间件3 耗时：1425ms
// 输出：  out 中间件2 耗时：2833ms
// 输出：  out 中间件1

