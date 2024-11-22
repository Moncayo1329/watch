import React from 'react';

import './App.css'; 

function Form() {
return (
 
    <div>
<form className="task-form">
        <h4>Movie Watch List </h4>
        <div className="form-control">
          <input
            type="text"
            name="name"
            className="task-input"
            placeholder="Harry Potter And The Philosopher'S Stone "
          />
          <button type="submit" className="btn submit-btn">Submit</button>
        </div>
        <div className="form-alert"></div>
      </form>

      <section className="tasks-container">
        <p className="loading-text">Loading...</p>
        <div className="tasks">
          {/* Aquí podrías mapear tareas y mostrarlas, por ahora, está vacío */}
        </div>
     </section>
    </div>


)

}


export default Form;