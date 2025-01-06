import React, { useState } from "react";
import axios from "axios";
import Form from "./movieForm"; // Componente para el formulario

function App() {
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [error, setError] = useState(null); // Manejo de errores



  // Función para obtener detalles de una película desde la API de TMDb
  const searchMovie = async (movieTitle) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/v1/movies/${movieTitle}`);
      const streamingData = response.data; // Se asume que la respuesta es un objeto con datos de la película

      if (streamingData) {
        setStreamingInfo(streamingData);
        setError(null);
      } else {
        setError("No se encontro informacion de streaming para esta pelicula");
        setStreamingInfo(null);
      }
    } catch (err) {
      setError("Hubo un error al obtener los detalles de la película");
      console.error(err);
      setStreamingInfo(null)
    }
  };



  return (
    <div className="task-form">
      <h4>¿Dónde está la peli?</h4>
      <Form searchMovie={searchMovie} />
      {error && <p className="error-message">{error}</p>}
      {streamingInfo && streamingInfo.platforms && Array.isArray(streamingInfo.platforms) && (
  <div className="streaming-info">
    <h3>{streamingInfo.title}</h3>
    <p>Disponible en:</p>
    <ul>
      {streamingInfo.platforms.map((platform, index) => (
        <li key={index}>{platform}</li>
      ))}
    </ul>
  </div>
)}
    </div>
  );
}

export default App;