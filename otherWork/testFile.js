// instal node-cron
// install shelljs

const cron = require('node-cron');
const shell = require('shelljs');
const router = require('express').Router();
const passport = require('passport');

module.exports = router;


router.get('/cronjob', (req, res)=>{
    console.log("in cron job router");
    cron.schedule('* * * * *', ()=>{  //(min, hour , day of month, months, days of week)
        console.log("first")
    })
    // only start when we want and also has control to stop;
    let second = cron.schedule('* * * * * *', ()=>{
        console.log("second tasj")
    }, {
        scheduled : false,
    })
    
    second.start();
    
    setInterval(()=>{
        second.stop();
    }, 5000)
})

router.get('/cookietest',(req, res)=>{
    console.log("in cookietest router")
    console.log(req.cookies);
    return res.cookie('name1', 'akash', {maxAge : 3000}, {maxAge : 3000}).json({success : true, message : "Cookie set"});
});

router.get('/sessiontest',(req,res)=>{

    console.log("in session test router");
    
    if(req.session.pageCount){
        req.session.pageCount++;
        return res.send(`Page count is ${req.session.pageCount}`)
    } else {
        req.session.pageCount = 1;
        return res.send(`Page count is ${req.session.pageCount}`)
    }
})

router.post('/login', passport.authenticate('local'),(req, res)=>{  
    res.json(req.user)
})

router.post('/auth/facebook', passport.authenticate('facebook'));

router.get('/auth/facebook/callback', passport.authenticate('facebook'),(req,res)=>{
    console.log("facebook callback reached")
    res.json({success : true})
})

