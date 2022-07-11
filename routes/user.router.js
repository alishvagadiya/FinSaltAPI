const express = require('express');
const router = express.Router();
const {isLogin} = require("../utils/isLogin");

router.use(isLogin);

const {User} = require('../models/user.model');

router.route('/')
  .get(async (req,res) =>{
    try{
      const userId = req.userId;
      const userDetails = await User.findById(userId);
      if(userDetails){
        userDetails.password = undefined
        res.json({ success: true, message:'login user deatails', userDetails });
      } else {
        res.json({ success: false, message:'No user Deatails found'});
      }
    } catch (err) {
      res.json({ success: false, message: 'user.get - Something went wrong', errMsg: err.message });
    }
  })

  module.exports = router;