const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot add unnamed category",
  }
  // ,
  // advisor: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Advisor'
  // }]
}, { timestamps: true });


CategorySchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(condition, doc) {
  const one = await this.findOne(condition);
  // console.log({one})
  return one || this.create(doc);
};


const Category = mongoose.model("Category", CategorySchema);
module.exports = { Category }