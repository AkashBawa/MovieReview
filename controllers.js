const router = require('express').Router();
const Joi = require('joi');
const MovieList = require('./models/movie')

router.get('/', (req, res)=>{
    res.send("Hello world")
})

router.get('/get',(req, res)=>{
    console.log("for get")
})

const movieSchemaValidator = Joi.object({
    name : Joi.string().min(1).required()
})

router.post('/addmovie', async (req, res)=>{

    try {
        const  value = movieSchemaValidator.validate(req.body);
  
        if(value.error){
            return res.json({success : false, error : value.error.details[0].message});
        }
       
        let prevMovie = await MovieList.find({name : req.body.name.toLowerCase()});
        console.log(prevMovie)

        if(prevMovie.length > 0){
            return res.json({success : false, message : "Movie name already exists"})
        }

        const movie = new MovieList({...req.body})

        await movie.save();
        return res.json({success : true, message : "Movie saved"})

    }catch(e){
        return res.json({success: false, message : "Something went wrong"})
    }
})

const addReviewSchema = Joi.object({
    userName : Joi.string().required(),
    score : Joi.number().required().min(1).max(5),
    comment : Joi.string().required(),
    movieName : Joi.string().required()
})

router.post('/addreview', async(req, res)=>{

    const value = addReviewSchema.validate(req.body);

    if(value.error){
        return res.json({success : false, error : value.error.details[0].message});
    }

    let movie = await MovieList.findOne({name : req.body.movieName.toLowerCase()});

    if(!movie){
        return res.json({success : false, message : "Movie name doesnot exist"});
    }
    
    let bool = movie.reviews.map(x=>{return x.userName}).includes(req.body.userName);

    if(bool){
        return res.json({success : false, message : "Review already given"});
    }
    
    movie.reviews.push(req.body);
    await movie.save();
    return res.json({success : true, message : "Review saves"});
})

// post request because it become difficult in parameters if movie name contain space, so name is passed in body;
router.post('/countandaverage', async(req, res)=>{

    try {
        if(!req.body.movieName){
            return {success : false, error : "Movie name required"};
        }

        let movie = await MovieList.findOne({name : req.body.movieName.toLowerCase()});

        if(!movie){
            return res.json({success : false, message : "Movie name doesnot exist"});
        }
        let sum = 0;
        for(let i = 0; i < movie.reviews.length; i++){
            sum += movie.reviews[i].score;
        }
        let avg = sum / movie.reviews.length;
        return res.json({success : true, average : avg, totalReview : movie.reviews.length})

    }catch(e){
        console.log(e)
        return res.json({success : false, message : "Something went wrong"})
    }
    
})

router.post('/allcomments',async(req, res)=>{
    
    if(!req.body.movieName) {
        return res.json({success : false, message : "movie name required"});
    }
    let movie = await MovieList.findOne({name : req.body.movieName.toLowerCase()});

    if(!movie){
        return res.json({success : false, message : "Movie name doesnot exist"});
    }

    let assending = [...movie.reviews];
    let decending = [...movie.reviews];

    assending.sort((x,y)=>{return x.score - y.score});
    decending.sort((x,y)=>{return y.score - x.score});
    
    return res.json({success : true, allComments : movie.reviews, asc : assending,dec :  decending })
})

module.exports = router;

function schemaValidation(schema, body){
    const  value = schema.validate(body);
  
    if(value.error){
        return {success : false, error : value.error.details[0].message};
    }else {
        return {success : true}
    }
}