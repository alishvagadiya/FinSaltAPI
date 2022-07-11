const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = process.env['SALT'];

const {User} = require('../models/user.model');

router.route('/')
  .post(async (req,res) =>{
    try{
      const {name, email, password} = req.body;
      const user = await User.findOne({email: email});

      if(user){
        return res.json({
          success:false,
          message:"Account with email id already exists."
        })
      }

      const cryptPassword = await bcrypt.hash(password, 10);
      const newUserObj = new User({name, email, password: cryptPassword})
      const newUser = await newUserObj.save();

      const token = jwt.sign({ userId: newUser._id }, salt,{expiresIn: "24h"});
      console.log(newUser);
      delete newUser.password;
      console.log(newUser);
      res.json({ userDetails:newUser, token, success: true, message:'Sign up successfully'});
    } catch (err) {
      res.json({ success: false, message: 'Something went wrong', errMsg: err.message });
    }
  })
  
  module.exports = router;