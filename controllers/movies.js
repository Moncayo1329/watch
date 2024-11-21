const Movie = require('../models/movies')

const getAllMovies = (req,res) => {

    res.send('get all movies')
}


// Crear una nueva película

const createMovie = async (req, res) => {

    try {
        const movie = await Movie.create(req.body)
        res.status(201).json({ movie }) 

    } catch(error) {

res.status(500).json({msg:error})

    }

}


// Obtener una película específica

const getMovie = (req, res) => {
    res.json({id:req.params.id})
} 

// Actualizar el estado de una película

const updateMovieStatus = (req, res) => {
    res.send('Update status')
} 








module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovieStatus,
}