const express = require('express');
const router = express.Router();

const {Category} = require('../models/category.model');

router.route('/')
  .post(async (req,res) =>{
    try{
      const {category} = req.body;
      const categoryFound = await Category.findOne({name: category});

      if(categoryFound){
        return res.json({
          success:false,
          message:"Category already exists."
        })
      }

      const newCategoryObj = new Category({name: category})
      const newCategory = await newCategoryObj.save();

      res.json({ category:newCategory, success: true, message:'New Category added successfully'});
    } catch (err) {
      res.json({ success: false, message: 'category.post - Something went wrong', errMsg: err.message });
    }
  })
  .get(async (req,res) =>{
    try{
      const categories = await Category.find({});
      res.json({ category:categories, success: true, message:'All Category'});
    } catch (err) {
      res.json({ success: false, message: 'category.get - Something went wrong', errMsg: err.message });
    }
  })

  module.exports = router;