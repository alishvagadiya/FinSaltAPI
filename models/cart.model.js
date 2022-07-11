const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

const CartSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  advisor: {
    type: Schema.Types.ObjectId,
    ref: 'Advisor',
    required: "Cannot add blank advisor.",
  },
  month: {
    type: Number,
    default: 1,
    min:1
  }
}, { timestamps: true });


const Cart = mongoose.model("Cart", CartSchema);
module.exports = { Cart }