import express from 'express'

const app = express()
app.use(express.json())

// 中间件
app.use((req, res, next) => {
    console.log(req.method, req.url, Date.now())
    next()
})

app.get('/todos', async (req, res) => {
    res.status(200).end('get')
})

app.listen(3000)
