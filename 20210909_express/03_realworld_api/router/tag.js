import express from 'express'
import * as TagCtrl from '../controller/tag.js'

const router = express.Router()

router.get('', TagCtrl.getTags)


export default router
