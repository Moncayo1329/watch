import React, { useState } from "react";
import axios from "axios";
import Form from "./movieForm"; // Componente para el formulario

// Usa una variable de entorno para la URL de la API, con fallback a localhost para desarrollo
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [streamingInfo, setStreamingInfo] = useState(null);
  const [error, setError] = useState(null);

  const searchMovie = async (movieTitle) => {
    try {
      const response = await axios.get(`${API_URL}/api/v1/movies/${movieTitle}`);
      const streamingData = response.data;

      if (streamingData) {
        setStreamingInfo(streamingData);
        setError(null);
      } else {
        setError("No se encontró información de streaming para esta película");
        setStreamingInfo(null);
      }
    } catch (err) {
      setError("Hubo un error al obtener los detalles de la película");
      console.error(err);
      setStreamingInfo(null);
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
