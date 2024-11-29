import React from "react";

function Movies({ task }) {
  return (
    <div className="movie-card">
      <img src={task.image} alt={task.title} className="movie-poster" />
      <h3 className="movie-title">{task.title}</h3>
      <p className="movie-description">{task.description}</p> {/* Accede a la descripción de la película */}
     
    </div>
  );
}

export default Movies;