const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Must provide movie title'],
    trim: true,
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Description cannot be more than 200 characters'],
  },
  streamingPlatform: {
    type: String,
    required: [true, 'Must provide streaming platform'],
  },
  // ... other fields you might want to keep
});

module.exports = mongoose.model('Movie', MovieSchema);
