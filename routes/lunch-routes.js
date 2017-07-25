const express = require('express');

const router = express.Router();

const LunchModel = require('../models/lunch-model');

router.post('/lunch', (req, res, next) => {
  if(!req.user) {
    res.status(401).json({ message: 'Log in to create your profile 🤠'});
    return;
  }

  const theLunch = new LunchModel ({
      name: req.body.lunchName,
      calories: req.body.lunchCalories,
      image: req.body.lunchImage,


  });

  theLunch.save((err) => {
    if(err && theLunch.errors === undefined) {
      res.status(500).json({ message: "Lunch Save went to Lunch 🍜 "});
      return;
    }
    if( err && theLunch.errors){
      res.status(400).json({
        nameError:theLunch.errors.name,
        caloriesError:theLunch.errors.calories,
        imageError:theLunch.errors.image
      });
      return;
    }
    res.status(200).json(theLunch);
  });

});

router.get('/lunch', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ message : "Log in to see profile"});
    return;
  }
LunchModel
.find()
.populate('user', { encryptedPassword:0 })
.exec((err, alltheLunch) => {
  if(err){
    res.status(500).json({ message: "Lunch find went to 💩💩💩💩"});
    return;
  }
  res.status(200).json(alltheLunch);
});


});

module.exports = router;
