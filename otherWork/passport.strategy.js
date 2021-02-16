const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
require('dotenv').config();

passport.use(new localStrategy(
    function (username, passward, done) {
        console.log(username, passward)
        return done(null, {username, passward})
    }
));

passport.use(new FacebookStrategy(
    {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done){
        
        console.log("reached")
        console.log(accessToken)
        console.log(refreshToken)
        done(null, {"akash ": "bawa"});
    }
))

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});