const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,'must provide name' ] , 
    trim: true,
    maxlength:[20, 'name can not be more than 20 characters']
  },
  completed: {
    type: Boolean,
    default: false,  // Valor predeterminado si no se especifica
  },
});

module.exports = mongoose.model('Movies', MovieSchema);
