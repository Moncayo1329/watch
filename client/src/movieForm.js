import React, { useState } from 'react';
import './App.css';

function Form({ searchMovie }) {
  // Estado para controlar el input
  const [value, setValue] = useState("");

  // Actualizar el estado cuando el usuario escriba en el input
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Movie name cannot be empty!"); // Validación del input
      return;
    }

    searchMovie(value); // Llamar a la prop `addmovie` para enviar el valor al componente padre
    setValue(""); // Limpiar el campo de texto después de enviar
  };

  return (
    <div>
      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="Harry Potter And The Philosopher's Stone"
            value={value} // Input controlado
            onChange={handleChange} // Manejar cambios en el input
          />
          <button type="submit" className="button">
            search Movie
          </button>
        </div>
      </form>

      <section className="tasks-container">
        <p className="loading-text"></p>
        <div className="tasks">
          {/* Aquí podrías mapear tareas y mostrarlas, por ahora, está vacío */}
        </div>
      </section>
    </div>
  );
}

export default Form;