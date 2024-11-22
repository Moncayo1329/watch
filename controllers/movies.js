const Movie = require('../models/movies')

const getAllMovies = async (req,res) => {

   try {
const movies = await Movie.find({})
    res.status(200).json({ movies })
   } catch(error) {
    res.status(500).json({msg:error})

   }
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

const getMovie = async (req, res) => { 

    try {

        const { id:movieID} = req.params
        const movie = await Movie.findOne({_id:movieID});
        if(!movie){
            return res.status(400).json({msg:`No Movie with id : ${movieID}`})
        }

        res.status(200).json({ movie })

    } catch {

        res.status(500).json({msg:error})
    }

    
} 

// Actualizar el estado de una película

const updateMovieStatus = async (req, res) => {
    try {
const {id:movieID} = req.params;

const movie = await Movie.findOneAndUpdate({_id:movieID},req.body,{
    new:true,
    runValidators:true,
})

if(!movie){
    return res.status(400).json({msg:`No Movie with id : ${movieID}`})
}

res.status(200).json({movie})

    } catch(error){
        res.status(500).json({msg:error})
    }
} 








module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovieStatus,
}