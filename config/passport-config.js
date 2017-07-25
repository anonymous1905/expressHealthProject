const passport = require('passport');
const bcrypt   = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;


const UserModel = require('../models/user-model');

passport.serializeUser((userFromDb, next )=>{
      next(null, userFromDb._id);

});

passport.deserializeUser((idFromBowl, next) =>{
UserModel.findById(
  idFromBowl,
  (err, userFromDb) => {
      if (err){
        next(err);
        return;
      }

        next(null, userFromDb);
  }
);

});

//email & password login Strategy
passport.use(new LocalStrategy(
{
  usernameField: 'blahEmail', //sent through AJAX from Angular
  passwordField: 'blahPassword' // sent through AJAX from Angular
},
(theEmail, thePassword, next)=>{

  UserModel.findOne(
    { email: theEmail },
    (err, userFromDb) => {
      if(err) {
        next(err);
        return;
      }
      if (userFromDb === null) {
        next(null, false, {message: "Incorrect email 💩"});
        return;

      }

      if (bcrypt.compareSync(thePassword, userFromDb.encryptedPassword) === false) {
        next(null, false, {message: "Incorrect Password 💩"});
        return;
        }
        next(null, userFromDb);
      }
      );

  }

));
