const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myLunchSchema = new Schema (
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

const LunchModel = mongoose.model('Lunch', myLunchSchema);

module.exports = LunchModel;
