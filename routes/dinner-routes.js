const express = require('express');

const router = express.Router();

const DinnerModel = require('../models/dinner-model');

router.post('/dinner', (req, res, next) => {
  if(!req.user) {
    res.status(401).json({ message: 'Log in to create your profile 🤠'});
    return;
  }

  const theDinner = new DinnerModel ({
      name: req.body.dinnerName,
      calories: req.body.dinnerCalories,
      image: req.body.dinnerImage,


  });

  theDinner.save((err) => {
    if(err && theDinner.errors === undefined) {
      res.status(500).json({ message: "Dinner Save went to Dinner 🥘 "});
      return;
    }
    if( err && theDinner.errors){
      res.status(400).json({
        nameError:theDinner.errors.name,
        caloriesError:theDinner.errors.calories,
        imageError:theDinner.errors.image
      });
      return;
    }
    res.status(200).json(theDinner);
  });

});

router.get('/dinner', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ message : "Log in to see profile"});
    return;
  }
DinnerModel
.find()
.populate('user', { encryptedPassword:0 })
.exec((err, alltheDinner) => {
  if(err){
    res.status(500).json({ message: "Dinner find went to 💩💩💩💩"});
    return;
  }
  res.status(200).json(alltheDinner);
});


});

module.exports = router;
