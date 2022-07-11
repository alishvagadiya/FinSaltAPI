const mongoose = require('mongoose');
const DB_URL = process.env['DB_URL']
console.log(DB_URL);
const dbConnect = async() => {
  try{
    await mongoose.connect( DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
  } catch(err) {
    console.log("mongoose connection failed...");
  }
}

module.exports = { dbConnect }