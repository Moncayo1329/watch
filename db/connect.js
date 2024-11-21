const mongoose = require('mongoose');

const connectionString = 'mongodb+srv://Mike_7:Barcelona123456@expressproject.gmb39.mongodb.net/watchListMovie?retryWrites=true&w=majority';

const connectDB = async () => {
    try {
        await mongoose.connect(connectionString); // Conexión simplificada
        console.log('Database connected successfully!');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Finaliza la aplicación si falla la conexión
    }
};

module.exports = connectDB;


