import express from 'express'
import * as ProfileCtrl from '../controller/profile.js'

const router = express.Router()

// 获取用户资料
router.get('/:username', ProfileCtrl.getProfile)

// 关注用户
router.post('/:username/follow', ProfileCtrl.followUser)

// 取消关注用户
router.delete('/:username/follow', ProfileCtrl.unfollowUser)


export default router
