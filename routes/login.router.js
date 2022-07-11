const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const salt = process.env['SALT'];

const {User} = require('../models/user.model');

router.route('/')
  .post(async (req,res) =>{
    try{
      const {email, password} = req.body;
      const user = await User.findOne({email: email});

      if(user){
        const passwordMatch = await bcrypt.compare(password, user.password)
        const token = jwt.sign({ userId: user._id }, salt,{expiresIn: "24h"});
        res.json({ userDetails:user, token, success: true, message:'login successfully'});
      } else {
        res.json({ success: false, message:'Invalid email and password'});
      }
    } catch (err) {
      res.json({ success: false, message: 'Something went wrong', errMsg: err.message });
    }
  })
  
  module.exports = router;