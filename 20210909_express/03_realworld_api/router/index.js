import express from 'express'
import userRouter from './user.js'
import profilesRouter from './profile.js'
import articlesRouter from './article.js'
import tagsRouter from './tag.js'

const router = express.Router()


router.use(userRouter)
router.use('/profiles', profilesRouter)
router.use('/articles', articlesRouter)
router.use('/tags', tagsRouter)

export default router
