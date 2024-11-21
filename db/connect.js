const mongoose = require('mongoose')

const connectionString = 'mongodb+srv://Mike_7:Barcelona123456@expressproject.gmb39.mongodb.net/watchListMovie?retryWrites=true&w=majority' 



mongoose.connect(connectionString).then(()=>console.log('connected to the db..')).catch((err) => console.log(err))