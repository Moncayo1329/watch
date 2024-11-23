import React from "react";

function Movies({ task }) {
  return (
    <div className="Movies">
      <p>{task.task}</p> {/* Accede a la descripción de la película */}
    </div>
  );
}

export default Movies;

  