
const express = require('express');
const app = express();
const movies = require('./routes/movies');
const connectDB = require('./db/connect')


// middleware 



app.use(express.json())



// Routes 

app.get('/Inicio',(req,res)=>{
    res.send('Watch List movie')
})


app.use('/api/v1/movies',movies)


// app.get('/api/v1/movies')  -get all movies
// app.post('/api/v1/movies')  -agregar nueva pelicula
// app.patch('/api/v1/movies/:id') -update status movie





const port = 5000 

const start = async () => {
    try{
  await connectDB()
  app.listen(port, console.log(`Server is listening on http://localhost:${port}...`))
    } catch(error){
 console.log(error)

    }
}

start()