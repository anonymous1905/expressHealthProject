const express = require('express');

const router = express.Router();

const BreakfastModel = require('../models/breakfast-model');

router.post('/breakfast', (req, res, next) => {
  if(!req.user) {
    res.status(401).json({ message: 'Log in to create your profile 🤠'});
    return;
  }

  const theBreakfast = new BreakfastModel ({
      name: req.body.breakfastName,
      calories: req.body.breakfastCalories,
      image: req.body.breakfastImage,


  });

  theBreakfast.save((err) => {
    if(err && theBreakfast.errors === undefined) {
      res.status(500).json({ message: "Breakfast Save went to Breakfast 🍳 "});
      return;
    }
    if( err && theBreakfast.errors){
      res.status(400).json({
        nameError:theBreakfast.errors.name,
        caloriesError:theBreakfast.errors.calories,
        imageError:theBreakfast.errors.image
      });
      return;
    }
    res.status(200).json(theBreakfast);
  });

});

router.get('/breakfast', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ message : "Log in to see profile"});
    return;
  }
BreakfastModel
.find()
.populate('user', { encryptedPassword:0 })
.exec((err, alltheBreakfast) => {
  if(err){
    res.status(500).json({ message: "Breakfast find went to 💩💩💩💩"});
    return;
  }
  res.status(200).json(alltheBreakfast);
});


});

module.exports = router;
