import axios from 'axios';

export default async function handler(req, res) {
  try {
    const movieTitle = "Inception"; // Puedes usar un título estático como ejemplo
    const apiKey = process.env.TMDB_API_KEY; // La clave de API almacenada en .env
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}&language=en-US`;

    const response = await axios.get(url);

    if (response.data.results && response.data.results.length > 0) {
      const movieData = response.data.results[0]; // Tomar el primer resultado
      res.status(200).json({
        title: movieData.title,
        description: movieData.overview,
        image: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`,
      });
    } else {
      res.status(404).json({ error: 'Película no encontrada' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al buscar la película' });
  }
}
