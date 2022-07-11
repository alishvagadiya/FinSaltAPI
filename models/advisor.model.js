const mongoose = require("mongoose");
require('mongoose-type-url');
const { Schema } = mongoose;

const AdvisorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Cannot add unnamed author.",
  },
  price: {
    type: Number,
    required: 'Cannot add profile without price'
  },
  rating: {
    type: Number,
    default: 0,
  },
  category: [{
    type: String,
    // type: Schema.Types.ObjectId,
    // ref: 'category',
    // childPath: 'advisors'
  }],
  yearsOfExperience: {
    type: Number,
    min: 0,
    max: 99,
    required: 'No. of Years Of Experience value must be in range of 0 to 99'
  },
  location: {
    type: String,
    required: "Cannot add advisor without location",
  },
  wfh: {
    type: Boolean,
    required: 'Cannot add advisor without value of work from home'
  },
  profile_URL: {
    type: mongoose.SchemaTypes.Url,
  },
  details: {
    type: String,
    minLength: [10, "The description must be at least 100 characters long"],
  }
}, { timestamps: true });


AdvisorSchema.statics.findOneOrCreateWith = async function findOneOrCreateWith(condition, doc) {
  const one = await this.findOne(condition);
  return one || this.create(doc);
};


const Advisor = mongoose.model("Advisor", AdvisorSchema);
module.exports = { Advisor }