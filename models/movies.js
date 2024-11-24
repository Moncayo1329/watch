const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 100,  // Permitir hasta 100 caracteres para el nombre
  },
  completed: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Movies', MovieSchema);