const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,  // Permitir hasta 100 caracteres para la pelicula
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movies', MovieSchema);