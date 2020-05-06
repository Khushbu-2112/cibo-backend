const mongoose = require('mongoose');

const TSPSchema = new mongoose.Schema({
  name: String,
  title: String,
  contactNo: String,
  joiningDate: Date,
  year: String,
  email: String,
  password: String,
  address: String,
  area: String,
  ratings:{
    type: Number,
    min: 0,
    max: 5
  },
  timings: String,
  closed:{
    type: String,
    default: true
  },
  image:String,
  serves: {
    type: [String],
    enum: ["Jain", "Swaminarayan", "Regular","Dinner","Lunch","Breakfast"]
  }
});

const TSP = mongoose.model('TSP',TSPSchema);

module.exports = TSP;
