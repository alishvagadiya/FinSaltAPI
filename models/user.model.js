const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot add unnamed user.",
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
}, { timestamps: true });


UserSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(condition, doc) {
    const one = await this.findOne(condition);
    return one || this.create(doc);
};


const User = mongoose.model("User", UserSchema);
module.exports = { User }