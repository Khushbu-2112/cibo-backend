const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  deliveryAddress: String,
  totalAmount: Number,
  orderedOn: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default : "Pending",
    enum: ["Pending", "Confirmed", "Canceled", "Delivered"]
  },
  userId:{
    type: Schema.Types.ObjectId,
    ref:'User'
  },
  tspId:{
    type: Schema.Types.ObjectId,
    ref:'TSP'
  },
  menuId: {
    type: Schema.Types.ObjectId,
    ref:'Menu'
  }
});

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order;
