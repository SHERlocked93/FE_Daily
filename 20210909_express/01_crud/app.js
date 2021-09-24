import express from 'express'
import fs from 'fs'
import { getDb, saveDb } from './db.js'

const app = express()
app.use(express.json())          // 解析表单请求体：application/json
// app.use(express.urlencoded({ extended: true }))  // 解析表单请求体：application/x-www-form-urlencoded

// 获取todos
app.get('/todos', async (req, res) => {
    try {
        const db = await getDb()
        res.status(200).json(db.todos)
    } catch (err) {
        return res.status(500).end({ error: err.message })
    }
})

// 获取单个todo
app.get('/todos/:id', async (req, res) => {
    try {
        const db = await getDb()
        const todo = db.todos.find(({ id }) => id.toString() === req.params.id)

        if (!todo) {
            return res.status(404).end('not found!')
        }
        res.status(200).json(todo)
    } catch (err) {
        return res.status(500).end({ error: err.message })
    }
})

// 添加todo
app.post('/todos', async (req, res) => {
    try {
        const todo = req.body
        if (!todo.title) {
            return res.status(422).json({
                error: '缺失title字段值',
            })
        }

        const db = await getDb()
        const lastTodo = db.todos[db.todos.length - 1]
        const newTodo = { id: lastTodo ? lastTodo.id + 1 : 1, ...todo }
        db.todos.push(newTodo)
        await saveDb(db)

        res.status(200).json(newTodo)
    } catch (err) {
        return res.status(500).end({ error: err.message })
    }
})

// 修改
app.patch('/todos/:id', async (req, res) => {
    try {
        const todo = req.body
        if (!todo.title) {
            return res.status(422).json({
                error: '缺失title字段值',
            })
        }

        const db = await getDb()
        const targetTodo = db.todos.find(({ id }) => id.toString() === req.params.id)

        if (!targetTodo) {
            return res.status(404).end('not found!')
        }
        Object.assign(targetTodo, todo)

        await saveDb(db)
        res.status(200).json(targetTodo)
    } catch (err) {
        return res.status(500).end({ error: err.message })
    }
})

// 删除todo
app.delete('/todos/:id', async (req, res) => {
    try {
        const todoId = req.params.id
        const db = await getDb()
        const idx = db.todos.findIndex(({ id }) => id.toString() === todoId)
        if (!todoId) {
            return res.status(422).json({
                error: '缺失ID字段值',
            })
        }
        if (idx === -1) {
            return res.status(422).json({
                error: '没有这个todo',
            })
        }

        db.todos.splice(idx, 1)
        await saveDb(db)
        res.status(204).end()
    } catch (err) {
        return res.status(500).end({ error: err.message })
    }
})

app.listen(3000)
