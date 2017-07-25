const express = require('express');

const router = express.Router();

const DietModel = require('../models/diet-model');

router.post('/diet', (req, res, next) => {
  if(!req.user) {
    res.status(401).json({ message: 'Log in to create your profile 🤠'});
    return;
  }

  const theDiet = new DietModel ({
      name: req.body.dietName,
      weight: req.body.weightNumber,
      height: req.body.heightNumber,
      user: req.user._id

  });

  theDiet.save((err) => {
    if(err && theDiet.errors === undefined) {
      res.status(500).json({ message: "Diet Save went to Diet 🥗 "});
      return;
    }
    if( err && theDiet.errors){
      res.status(400).json({
        nameError:theDiet.errors.name,
        weightError:theDiet.errors.weight,
        heightError:theDiet.errors.height
      });
      return;
    }
    res.status(200).json(theDiet);
  });

});

router.get('/diet', (req, res, next) => {
  if(!req.user){
    res.status(401).json({ message : "Log in to see profile"});
    return;
  }
DietModel
.find()
.populate('user', { encryptedPassword:0 })
.exec((err, alltheDiets) => {
  if(err){
    res.status(500).json({ message: "Diet find went to 💩💩💩💩"});
    return;
  }
  res.status(200).json(alltheDiets);
});


});

module.exports = router;
