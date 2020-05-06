const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  orderType: {
    type: String,
    enum: ["Breakfast", "Lunch", "Dinner"]
  },
  menuType: String,
  name: String,
  items: [String],
  price: Number,
  offer: String,
  availability: {
    type: Boolean,
    default: true
  },
  enteredBy: {
    type: Schema.Types.ObjectId,
    ref:'TSP'
  }
},
{timestamps: true});

const Menu = mongoose.model('Menu',MenuSchema);

module.exports = Menu;
