const express = require('express')
const controller = require('./controllers');
const bodyParser = require("body-parser")

var cookieParser = require('cookie-parser');
const app = express();

// Mongoose database connection
const databaseConnection = require('./connections/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));                        // extended true because to  get nested object in the req body
app.use(cookieParser());
app.use(controller)

databaseConnection();
app.listen(3000, function(){
    console.log("listening to port 3000")
})