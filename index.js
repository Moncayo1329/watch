const express = require('express');
const cors = require('cors');
const axios = require('axios');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

// Check if API key is defined
if (!process.env.WATCHMODE_API_KEY) {
    console.error('Error: WATCHMODE_API_KEY is not defined');
    process.exit(1);
}

app.use(cors({
    origin: '*', // Allow all origins (consider restricting this in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Rutas del backend
app.get('/Inicio', (req, res) => {
    res.send('Watch List movie');
});
app.get('/api/v1/movies/:title', async (req, res) => {
  const movieTitle = encodeURIComponent(req.params.title);
  const apiKey = process.env.WATCHMODE_API_KEY;
  const url = `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${movieTitle}`;

  try {
      console.log(`Requesting URL: ${url}`); // Log the request URL
      const response = await axios.get(url);
      console.log('Search API Response:', response.data); // Log the search response

      const titleResults = response.data.title_results;

      if (titleResults && titleResults.length > 0) {
          const movieData = titleResults[0];
          console.log('Movie Data:', movieData); // Log movie data

          // Get streaming platform information
          const sourcesUrl = `https://api.watchmode.com/v1/title/${movieData.id}/sources/?apiKey=${apiKey}`;
          console.log(`Requesting Sources URL: ${sourcesUrl}`); // Log sources request
          const sourcesResponse = await axios.get(sourcesUrl);
          console.log('Sources API Response:', sourcesResponse.data); // Log sources response

          res.json({
              title: movieData.name,
              year: movieData.year,
              image: movieData.image_url,
              platforms: sourcesResponse.data.map(source => source.name) // Return platform names
          });
      } else {
          res.status(404).json({ error: 'Movie not found' });
      }
  } catch (error) {
      console.error('Error details:', error.response ? error.response.data : error.message);
      res.status(500).json({ error: 'Error searching for the movie' });
  }
});



start();
