const express = require('express');
const app = express();
const cors = require('cors');
const movies = require('./routes/movies');
const connectDB = require('./db/connect');
const axios =  require('axios')
require('dotenv').config();




app.use(cors({
  origin: '*',  // Permite solicitudes desde cualquier dominio
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Puedes especificar qué métodos HTTP permitir
  allowedHeaders: ['Content-Type', 'Authorization'],  // Puedes especificar qué cabeceras se permiten
}));

app.use(express.json())  // Para parsear JSON en las solicitudes

// Rutas del backend
app.get('/Inicio', (req, res) => {
    res.send('Watch List movie');
});


app.get('/api/v1/movies/:title', async (req, res) => {
  const movieTitle = encodeURIComponent(req.params.title);
  const apiKey = process.env.WATCHMODE_API_KEY;
  const url = `https://api.watchmode.com/v1/search/?apiKey=${apiKey}&search_field=name&search_value=${movieTitle}`;

  try {
    const response = await axios.get(url);
    console.log('Watchmode API Response:', response.data);

    if (response.data.title_results && response.data.title_results.length > 0) {
      const movieData = response.data.title_results[0];
      
      // Get streaming platform information
      const sourcesUrl = `https://api.watchmode.com/v1/title/${movieData.id}/sources/?apiKey=${apiKey}`;
      const sourcesResponse = await axios.get(sourcesUrl);
      
      res.json({
        title: movieData.name,
        year: movieData.year,
        image: movieData.image_url,
        platforms: sourcesResponse.data.map(source => source.name)
      });
    } else {
      res.status(404).json({ error: 'Movie not found' });
    }
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error searching for the movie' });
  }
});



app.use('/api/v1/movies', movies);

// Puerto donde escuchará el backend
const port = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_MOV);  // Conexión a la base de datos
        app.listen(port, '0.0.0.0',() => {
          console.log(`Server is listening on http://localhost:${port}...`)
        });
    } catch (error) {
        console.log(error);
    }
};

start();