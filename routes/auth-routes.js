const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');



const UserModel = require('../models/user-model');

const router = express.Router();


router.post('/signup', (req, res, next) => {



  if (!req.body.signupEmail || !req.body.signupPassword) {
    res.status(400).json({ message: "Need both email and Password 💩"});
    return;
   }

   UserModel.findOne(
     { email: req.body.signupEmail},
     (err, userFromDb) => {
       if (err) {
         res.status(500).json({ message: "Email check went to 💩"});
         return;
       }

       if(userFromDb) {
         //400 for client errors (user needs to fix something)
         res.status(400).json({ message: 'Email already exists'});
         return;
       }
       console.log(req.body.signupPassword);
       const salt = bcrypt.genSaltSync(10);
       const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);
       console.log(salt);

       const theUser = new UserModel ({
         fullName: req.body.signupFullName,
         email: req.body.signupEmail,
         username:req.body.signupUsername,
         encryptedPassword: scrambledPassword
       });

       





       theUser.save((err) => {

         if(err) {
         res.status(500).json({message: "User save went to 💩"});

         return;
       }

       req.login(theUser, (err) => {
         if(err){
           res.status(500).json({message:"Login went to 💩"});
           return;
         }

      theUser.encryptedPassword = undefined;

       res.status(200).json(theUser);

      });
   });
  }
 );
});



router.post('/login', (req, res, next) => {
  const authenticateFunction =
   passport.authenticate('local', (err, theUser, extraInfo) => {
        // ERRors preventing us from knowinf if login was sucessful/failed
      if(err){
        res.status(500).json({ message:" "});
        return;
      }

        // Login failed
        if(!theUser) {
          // extraInfo contains feedback message from LocalStrategy
          res.status(401).json(extraInfo);
          return;
        }
        // Login Successful
        req.login(theUser, (err) => {
          if (err) {
            res.status(500).json({ message: " Session save Error 💩"});
            return;
          }
          theUser.encryptedPassword = undefined;



            // Everything worked ! Send the users info to the client.
            res.status(200).json(theUser);
        });
      });
   authenticateFunction(req, res, next);
});


router.post('/logout', (req, res, next) =>{
      req.logout();
      res.status(200).json({ message: ' Log out Success 🐪 🐫'});

});


router.get('/checklogin', (req, res, next) => {
 if(!req.user) {
   res.status(401).json({ message: "Nobody logged in 🔐"});
   return;
 }
 req.user.encryptedPassword = undefined;

 res.status(200).json(req.user);



});

//POST login
// POST Logout
//GET checklogin



module.exports = router;
