const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myDinnerSchema = new Schema (
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

const DinnerModel = mongoose.model('Dinner', myDinnerSchema);

module.exports = DinnerModel;
