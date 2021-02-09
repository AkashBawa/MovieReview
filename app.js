const express = require('express')
const controller = require('./controllers');
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require('express-session')
const morgan = require('morgan');

const testFile = require('./otherWork/testFile');


const app = express();

// Mongoose database connection
const databaseConnection = require('./connections/db');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));                        // extended true because to  get nested object in the req body
app.use(cookieParser());
app.use(session({secret : "Place our secret key"}));
app.use(morgan('dev'))                                                    // short , tiny, dev, combined, common

app.use(controller);
app.use(testFile);

databaseConnection();
app.listen(3000, function(){
    console.log("listening to port 3000")
})


 