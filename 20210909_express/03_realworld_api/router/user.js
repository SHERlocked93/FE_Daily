import express from 'express'
import * as UserCtrl from '../controller/user.js'

const router = express.Router()

// 用户登录
router.post('/users/login', UserCtrl.login)

// 用户注册
router.post('/users', UserCtrl.register)

// 获取当前登录用户
router.get('/user', UserCtrl.getCurrUser)

// 更新当前登录用户
router.put('/user', UserCtrl.updateCurrUser)

export default router
