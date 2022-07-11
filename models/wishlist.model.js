const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

const WishlistSchema = new mongoose.Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  advisor: {
    type: Schema.Types.ObjectId,
    ref: 'advisor'
  },
}, { timestamps: true });


const Wishlist = mongoose.model("Wishlist", WishlistSchema);
module.exports = { Wishlist }