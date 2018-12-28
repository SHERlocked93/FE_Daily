/**
 * 创建于 2018/12/24
 * 作者: SHERlocked93
 * 功能: 使用09封装的模块
 */

const app = require("express")()
const assert = require('assert')
const mongoose = require('mongoose')

const BASE_URL = 'mongodb://localhost:27017/test1'

mongoose.connect(BASE_URL)

const Cat = mongoose.model('Cat', { name: String, age: Number })

const kitty = new Cat({ name: 'mimi', age: 3 })
kitty.save().then(() => console.log('meow'))
