const Movie = require('../models/movies');

const createMovie = async (req, res) => {
  try {
    const { title, shortDescription, streamingPlatform } = req.body;
    const movie = await Movie.create({ title, shortDescription, streamingPlatform });
    res.status(201).json({ movie });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({}, 'title shortDescription streamingPlatform');
    res.status(200).json({ movies });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getMovie = async (req, res) => {
  try {
    const { id: movieID } = req.params;
    const movie = await Movie.findOne({ _id: movieID }, 'title shortDescription streamingPlatform');
    if (!movie) {
      return res.status(404).json({ msg: `No movie with id: ${movieID}` });
    }
    res.status(200).json({ movie });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateMovieStatus = async (req, res) => {
try{

    const {id:movieID} = req.params;
    const {status} = req.body;
    const movie = await Movie.findOneAndUpdate(
  {_id:movieID},
  { status}, 
  {new: true, runValidators:true}
    );
    if(!movie) {
return res.status(404).json({msg: `No movie with id: ${movieID}`

});
}

res.status(200).json({ movie });
} catch (error) {
res.status(500).json({ msg: error.message });
}
};

// ... other controller functions

module.exports = {
  getAllMovies,
  createMovie,
  getMovie,
  updateMovieStatus,
  // ... other exported functions
};





