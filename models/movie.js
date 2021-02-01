const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name : {type : String, required : true, lowercase : true},

    reviews : [{
        userName : {type : String},
        score : {type : Number},
        comment : {type : String}
    }]
})

module.exports = mongoose.model('movie', schema)