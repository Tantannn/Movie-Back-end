const express = require('express')

const router = express.Router()

const MovieController = require('../app/controllers/MovieController')

router.get('/trending', MovieController.trending)
router.get('/top-rated', MovieController.topRate)
router.get('/discover', MovieController.discovery)
router.get('/search', MovieController.search)
router.get('/video', MovieController.video)
router.get('/', MovieController.movie)


module.exports = router
