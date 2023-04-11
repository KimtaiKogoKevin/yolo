const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const upload = multer();
require("dotenv").config();

const productRoute = require('./routes/api/productRoute');

// Connecting to the Database
let mongodb_url = "mongodb+srv://kevinkogo:4DKRzGoYbWwS3iku@ipweekone.gus6huv.mongodb.net/?retryWrites=true&w=majority"
// let mongodb_url='mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@mongodb:27017/'
//  let mongodb_url = "mongodb://mongodb-0.mongo:27017/"
let dbName = 'yolomy';
// define a url to connect to the database
const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName
mongoose.connect(MONGODB_URI,{useNewUrlParser: true, useUnifiedTopology: true  } )
let db = mongoose.connection;

// Check Connection
db.once('open', ()=>{
    console.log('Database connected successfully')
})

// Check for DB Errors
db.on('error', (error)=>{
    console.log(error);
})

// Initializing express
const app = express()

// Body parser middleware
app.use(express.json())

// 
app.use(upload.array()); 

// Cors 
app.use(cors());

// Use Route
app.use('/api/products', productRoute)

// Define the PORT
// const PORT = process.env.PORT || 5009
const PORT = 2222

app.listen(PORT, ()=>{
    console.log(`Server listening on port ${PORT}`)
})
