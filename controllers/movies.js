const Movie = require('../models/movies');

// Obtener todas las películas
const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.find({});
        res.status(200).json({ movies });
    } catch (error) {
        console.error(error);  // Log para depuración
        res.status(500).json({ msg: 'Error al obtener las películas', error: error.message });
    }
};

// Crear una nueva película
const createMovie = async (req, res) => {
    const { name, completed } = req.body; // Asegúrate de que estos campos sean enviados correctamente desde el frontend

    if (!name || typeof completed !== 'boolean') {
        return res.status(400).json({ msg: 'Faltan datos necesarios (name, completed)' });
    }

    try {
        const movie = await Movie.create({ name, completed });
        res.status(201).json({ movie });
    } catch (error) {
        console.error(error);  // Log para depuración
        res.status(500).json({ msg: 'Error al crear la película', error: error.message });
    }
};

// Obtener una película específica
const getMovie = async (req, res) => {
    try {
        const { id: movieID } = req.params;
        const movie = await Movie.findOne({ _id: movieID });

        if (!movie) {
            return res.status(404).json({ msg: `No se encontró película con ID: ${movieID}` });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.error(error);  // Log para depuración
        res.status(500).json({ msg: 'Error al obtener la película', error: error.message });
    }
};

// Actualizar el estado de una película
const updateMovieStatus = async (req, res) => {
    const { id: movieID } = req.params;
    const { completed } = req.body;

    // Verificar que 'completed' es un valor booleano
    if (typeof completed !== 'boolean') {
        return res.status(400).json({ msg: 'El estado de la película debe ser un valor booleano' });
    }

    try {
        const movie = await Movie.findOneAndUpdate(
            { _id: movieID },
            { completed },
            { new: true, runValidators: true }
        );

        if (!movie) {
            return res.status(404).json({ msg: `No se encontró película con ID: ${movieID}` });
        }

        res.status(200).json({ movie });
    } catch (error) {
        console.error(error);  // Log para depuración
        res.status(500).json({ msg: 'Error al actualizar el estado de la película', error: error.message });
    }
};

module.exports = {
    getAllMovies,
    createMovie,
    getMovie,
    updateMovieStatus,
};





