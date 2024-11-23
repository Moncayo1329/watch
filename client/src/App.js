import React, {useState} from 'react';
import './App.css';
import Form from './movieForm';
import { v4 as uuidv4 } from 'uuid';
import Movies from './Movie';


function App() {

const [movies, setMovies] = useState([]); 



const addmovie = movie => {
 setMovies([...movies, {id: uuidv4(), task: movie, completed:false, isEditing:false}]);
 console.log(movies)
};

  return (
    <div className="task-form"> 
    <Form addmovie={addmovie}/>
    {movies.map((movie,index) => (
      <Movies task={movie} key={index}/>
    ))}
    
    </div>
  );
}

export default App;
