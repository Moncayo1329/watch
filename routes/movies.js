const express = require('express')
const router = express.Router()


const {getAllMovies,createMovie,getMovie,updateMovieStatus,} = require('../controllers/movies')


router.route('/').get(getAllMovies).post(createMovie)
router.route('/:id').get(getMovie).patch(updateMovieStatus)


module.exports = router;
