const getAllMovies = (req,res) => {

    res.send('get all movies')
}


// Crear una nueva película

const createMovie = (req, res) => {
    res.json(req,body)
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