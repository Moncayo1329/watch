const express = require('express')
const router = express.Router()
const {getAllMovies} = require('../controllers/movies')


router.route('/').get(getAllMovies)


module.exports = router