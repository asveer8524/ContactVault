const express=require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv=require("dotenv").config();  //dotenv is a popular npm package used for loading environment variables from a .env file into the process.env object
const connectDB = require ("./config/dbConnection");

connectDB();
const app=express();
port= process.env.port || 5000;

//paresing data from client
app.use(express.json());

//contact data
app.use('/api/contacts', require('./routes/contactRoutes'));

//user login
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})