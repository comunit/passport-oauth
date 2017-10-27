const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null,user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null,user);
  });
});

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our db
      User.findOne({googleid: profile.id}).then((currentUser) => {
        if(currentUser) {
          // already have the user
          console.log('user is', currentUser);
          done(null, currentUser);
        }else {
          // create user in our db
          new User({
            username: profile.displayName,
            googleid: profile.id
          }).save().then((newUser) => {
            console.log('new User Created' + newUser);
            done(null, newUser);
          });
        }
      });
    })
);