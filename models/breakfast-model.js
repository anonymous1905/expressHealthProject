const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myBreakfastSchema = new Schema (
    {
  name: {
        type:String,
        required:true
    },
  calories: {
       type: Number,
       required: true
    },

  image: {
     type: String,
     required: true
  },
},
  {
    timestamps: true
  }
);

const BreakfastModel = mongoose.model('Breakfast', myBreakfastSchema);

module.exports = BreakfastModel;
