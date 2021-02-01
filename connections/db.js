const mongoose = require('mongoose');

const URL = "mongodb://localhost:27017/movieReview"

const connection = async()=>{
    try{
        mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true});
        const db = mongoose.connection;
        db.on('error', error => console.log(error));
        db.once('open', () => console.log("Database connection established"));

    }catch(e){
        console.log("Error in DB connection")
    }
}
module.exports = connection