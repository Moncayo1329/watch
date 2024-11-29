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
    try {
      const response = await axios.get(`http://localhost:5000/api/movies/${movieTitle}`); // Llama a tu backend
      const movieData = response.data; // Se asume que la respuesta es un objeto con datos de la película

      if (movieData) {
        return {
          title: movieData.title,
          description: movieData.description,
          image: movieData.image, // La URL de la imagen que ya está formateada desde el backend
        };
      } else {
        setError("Película no encontrada");
        return null;
      }
    } catch (err) {
      setError("Hubo un error al obtener los detalles de la película");
      console.error(err);
      return null;
    }
  };

  // Función para agregar una nueva película
  const addmovie = async (movieTitle) => {
    const movieDetails = await fetchMovieDetails(movieTitle);
    if (movieDetails) {
      setMovies((prevMovies) => [...prevMovies, movieDetails]); // Añadir la nueva película al estado
      setError(null); // Limpiar cualquier mensaje de error
      
      // Ahora guardamos la película en la base de datos del backend
      try {
        const response = await axios.post("http://localhost:5000/api/v1/movies", {
          name: movieDetails.title,
          completed: false, // Establecer como no completada inicialmente
        });
        setMovies((prevMovies) => [...prevMovies, response.data.movie]); // Añadir la nueva película al estado
      } catch (error) {
        setError("Hubo un error al agregar la película");
        console.error(error);
      }
    }
  };

  return (
    <div className="task-form">
      <h4>Movie Watch List by Mike</h4>
      <Form addmovie={addmovie} />
      {error && <p className="error-message">{error}</p>} {/* Mostrar errores si existen */}
      {movies.map((movie, index) => (
        <Movies task={movie} key={index} /> // Mostrar todas las películas
      ))}
    </div>
  );
}

export default App;