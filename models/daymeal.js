const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const myDaymealSchema = new Schema (
    {
  date: {
        type:Date,
        required:true
    },
  breakfast: {
       type: Array,
       required: true
    },

  lunch: {
     type: Array,
     required: true
  },
  dinner: {
     type: Array,
     required: true
  },
  owner: {
     type: Schema.Types.ObjectId,
     required: true
  },
},
  {
    timestamps: true
  }
);

const BreakfastModel = mongoose.model('Breakfast', myBreakfastSchema);

module.exports = BreakfastModel;
