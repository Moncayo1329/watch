const express = require('express');
const app = express();
const cors = require('cors');
const movies = require('./routes/movies');
const connectDB = require('./db/connect');
require('dotenv').config();


app.use(cors()); // Aplica las opciones de CORS

app.use(express.json())  // Para parsear JSON en las solicitudes

// Rutas del backend
app.get('/Inicio', (req, res) => {
    res.send('Watch List movie');
});

app.use('/api/v1/movies', movies);

// Puerto donde escuchará el backend
const port = 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_MOV);  // Conexión a la base de datos
        app.listen(port, console.log(`Server is listening on http://localhost:${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();
