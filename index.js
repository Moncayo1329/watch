const express = require('express');
const app = express();
const cors = require('cors');
const movies = require('./routes/movies');
const connectDB = require('./db/connect');
const axios =  require('axios')
require('dotenv').config();




app.use(cors({
  origin: 'https://watch-virid.vercel.app/',  // Esto permite solicitudes desde cualquier dominio
})); // Aplica las opciones de CORS

app.use(express.json())  // Para parsear JSON en las solicitudes

// Rutas del backend
app.get('/Inicio', (req, res) => {
    res.send('Watch List movie');
});


app.get('/api/movies/:title', async (req, res) => {
    const movieTitle = encodeURIComponent(req.params.title); // Codificar el título para la URL
    const apiKey = process.env.TMDB_API_KEY;
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}&language=en-US`;
  
    try {
      const response = await axios.get(url);
  
      console.log(response.data); // Ver la respuesta completa para depuración
  
      // Verificar si la respuesta contiene resultados
      if (response.data.results && response.data.results.length > 0) {
        const movieData = response.data.results[0]; // Tomar el primer resultado
  
        res.json({
          title: movieData.title,
          description: movieData.overview,
          image: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`, // URL de la imagen
        });
      } else {
        res.status(404).json({ error: 'Película no encontrada' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al buscar la película' });
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