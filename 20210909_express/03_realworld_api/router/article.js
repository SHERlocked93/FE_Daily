import express from 'express'
import * as ArtCtrl from '../controller/article.js'

const router = express.Router()

router.get('/', ArtCtrl.getArticles)

router.get('/feed', ArtCtrl.feadArticles)

router.get('/:slug', ArtCtrl.getArticle)

router.post('/', ArtCtrl.createArticle)

router.put('/:slug', ArtCtrl.updateArticle)

router.delete('/:slug', ArtCtrl.deleteArticle)

router.post('/:slug/comments', ArtCtrl.addComments)

router.get('/:slug/comments', ArtCtrl.getComments)

router.delete('/:slug/comments/:id', ArtCtrl.deleteComments)

router.post('/:slug/favorite', ArtCtrl.favoriteArt)

router.delete('/:slug/favorite', ArtCtrl.unfavoriteArt)


export default router
