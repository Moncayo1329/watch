import React, { useEffect, useState } from "react";
import axios from "axios";
import Movies from "./Movie"; // Componente para mostrar la película
import Form from "./movieForm"; // Componente para el formulario

function App() {
  const [movies, setMovies] = useState([]); // Lista de películas
  const [error, setError] = useState(null); // Manejo de errores

  // Al cargar la aplicación, leer las películas desde localStorage.
  useEffect(() => {
    const storedMovies = localStorage.getItem("movies"); // Obtener las películas del localStorage
    if (storedMovies) {
      setMovies(JSON.parse(storedMovies)); // Parsear y asignar las películas al estado
    }
  }, []); // Este useEffect solo se ejecuta al montar el componente

  // Guardar las películas en localStorage cada vez que cambien
  useEffect(() => {
    if (movies.length > 0) {
      localStorage.setItem("movies", JSON.stringify(movies)); // Guardar las películas en localStorage
    }
  }, [movies]); // Este useEffect se ejecuta cada vez que el estado `movies` cambie

  // Función para obtener detalles de una película desde la API de TMDb
  const fetchMovieDetails = async (movieTitle) => {
    const apiKey = '533472bbde22403e17df87ee3d377b10';
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}&language=en-US`;
    try {
      const response = await axios.get(url);
      const movieData = response.data.results[0]; // Tomar el primer resultado

      if (movieData) {
        return {
          title: movieData.title,
          description: movieData.overview,
          image: `https://image.tmdb.org/t/p/w500${movieData.poster_path}`, // URL de la imagen
        };
      } else {
        setError("Pelicula no encontrada");
        return null;
      }
    } catch (err) {
      setError("Hubo un error");
      console.error(err);
    }
  };

  // Función para agregar una nueva película
  const addmovie = async (movieTitle) => {
    const movieDetails = await fetchMovieDetails(movieTitle);
    if (movieDetails) {
      setMovies((prevMovies) => [...prevMovies, movieDetails]); // Añadir la nueva película al estado
      setError(null); // Limpiar cualquier mensaje de error
    }
   


  if (movieDetails) {
    try {
      const response = await axios.post("http://localhost:5000/api/v1/movies", {
        name: movieDetails.title,
        completed: false, // Establece el estado de la película como false inicialmente
      });

      setMovies((prevMovies) => [...prevMovies, response.data.movie]); // Añadir la nueva película al estado
      setError(null); // Limpiar cualquier mensaje de error
    } catch (error) {
      setError("Hubo un error al agregar la película");
      console.error(error);
    }
  }
};




  return (
    <div className="task-form">
      <Form addmovie={addmovie} />
      {error && <p className="error-message">{error}</p>} {/* Mostrar errores si existen */}
      {movies.map((movie, index) => (
        <Movies task={movie} key={index} /> // Mostrar todas las películas
      ))}
    </div>
  );
}




export default App;