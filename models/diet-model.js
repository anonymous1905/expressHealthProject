const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myDietSchema = new Schema (
    {
  name: {
        type:String,
        required:true
    },
  weight: {
       type: Number,
       required: true
    },

  height: {
    type: Number,
    required: true
  },

  meals: {
    type: [Schema.Types.ObjectId],
    ref: 'Meals',
    // required: true
  },
},
  {
    timestamps: true
  }
);

const DietModel = mongoose.model('Diet', myDietSchema);

module.exports = DietModel;
