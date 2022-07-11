const express = require('express');
const router = express.Router();
const {isLogin} = require("../utils/isLogin");

router.use(isLogin);

const {Cart} = require('../models/cart.model');

async function add(userId,advisorId,month){
  try{
      console.log({"loca":"add",userId,advisorId,month})
      const newCartObj = new Cart({advisor: advisorId,month:month, owner: userId})
      const newCart = await newCartObj.save();
      return ({ cart:newCart, success: true, message:'Advisor added successfully'});
    } catch (err) {
      return ({ success: false, message: 'cart.add - Something went wrong', errMsg: err.message });
    }
}

async function update(userId,advisorId,month){
  try{
      const newCart = await Cart.findOneAndUpdate({owner: {_id : userId}, advisor: {_id : advisorId}},{month});
      console.log({"loca":"update",userId,advisorId,month})

      const updatedCart = await Cart.findById(newCart['_id']);
      return ({ cart:updatedCart,success: true, message:'Cart Updated successfully'});
    } catch (err) {
      return ({ success: false, message: 'cart.update - Something went wrong', errMsg: err.message });
    }
}

async function remove(userId,advisorId){
   try{
      const deletedCart = await Cart.findOneAndRemove({owner: {_id : userId}, advisor: {_id : advisorId}});
      return ({ success: true, message:'Advisor deleted from cart'});
    } catch (err) {
      return ({ success: false, message: 'cart.remove - Something went wrong', errMsg: err.message });
    }
}

async function getByAdvisorId(userId,advisorId){
  try{
      const cartData = await Cart.findOne({owner: {_id : userId}, advisor: {_id : advisorId}}).populate('advisor').populate('owner').exec()
      return ({ success: true, cart: cartData, message: 'Cart Retrived Successfully' })
    } catch (err) {
      return ({ success: false, message: 'cart.getByAdvisorId - Something went wrong', errMsg: err.message });
    }
}

async function getAll(userId){
  try{
      const cartData = await Cart.find({owner: {_id : userId}}).populate('advisor').populate('owner').exec()
      return ({ success: true, cart: cartData, message: 'Cart Retrived Successfully' })
    } catch (err) {
      return ({ success: false, message: 'cart.getAll - Something went wrong', errMsg: err.message });
    }
}
1
router.route('/')
  .post(async (req,res) =>{
    try{
      const userId = req.userId;
      const cartBody = req.body;
      const advisorId = cartBody.advisor;
      const month = cartBody.month;
      // const {advisorId,month} = req.body
      const cartData = await getByAdvisorId(userId, advisorId);
      if((cartData.cart) != null){
        if(month === 0){
          const removedCartData = await remove(userId, advisorId);
          res.json(removedCartData);
        } else {
          const updatedCartData = await update(userId, advisorId,month);
          res.json(updatedCartData);
        }
      } else {
        // if(month > 0){
          const addedCartData = await add(userId, advisorId, month);
          res.json(addedCartData);
        // } else {
        //   res.json({ success: false, message: 'cart.post - advisor Can not be added with 0 month'});  
        // }
      }
    } catch (err) {
      res.json({ success: false, message: 'cart.post - Something went wrong', errMsg: err.message });
    }
  })
  .get(async (req,res) => {
    res.json(await getAll(req.userId))
  })

  module.exports = router;