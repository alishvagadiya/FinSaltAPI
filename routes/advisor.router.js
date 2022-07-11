const express = require('express');
const {extend} = require('lodash');
const router = express.Router();

const {Advisor} = require('../models/advisor.model');

router.route('/')
  .post(async (req,res) =>{
    try{
      const advisorBody = req.body;
      const newAdvisorObj = new Advisor(advisorBody)
      const newAdvisor = await newAdvisorObj.save();
      res.json({ advisor:newAdvisor, success: true, message:'New Advisor added successfully'});
    } catch (err) {
      res.json({ success: false, message: 'advisor.post - Something went wrong', errMsg: err.message });
    }
  })
  .get(async (req,res) =>{
    try{
      // const {category} = req.body;
      const advisores = await Advisor.find({});
      res.json({ advisor:advisores, success: true, message:'All Advisores'});
    } catch (err) {
      res.json({ success: false, message: 'advisor.get - Something went wrong', errMsg: err.message });
    }
  })

router.param("advisorId", async (req, res, next,advisorId) =>{
  try{
      // const {category} = req.body;
      const advisor = await Advisor.findById(advisorId);
      if (!advisor) {
        return res
          .status(404)
          .json({ success: false, message: "error retrieving Advisor" });
      }
      req.advisor = advisor;
      next();
    } catch (err) {
      res.status(404).json({ success: false, message: 'advisor.param - Something went wrong', errMsg: err.message });
    }
})

router.route("/:advisorId")
  .get(async (req,res) =>{
    try{
      const {advisor} = req;
      advisor.__v = undefined;
      res.json({ advisor:advisor, success: true, message:'Advisor found'});
    } catch (err) {
      res.json({ success: false, message: 'advisor.advisorID.get - Something went wrong', errMsg: err.message });
    }
  })
  .post(async (req,res) =>{
    try{
      const advisorUpdate = req.body
      let {advisor} = req;
      
      advisor  = extend(advisor,advisorUpdate);
      updatedAdvisor = await advisor.save();
      res.json({ advisor:updatedAdvisor, success: true, message:'Advisor details Updated'});
    } catch (err) {
      res.json({ success: false, message: 'advisor.advisorID.post - Something went wrong', errMsg: err.message });
    }
  })
  .delete(async (req,res) =>{
    try{
      const {advisor} = req;
      const deletedAdvisor = await advisor.remove();
      res.json({ advisor:deletedAdvisor, success: true, message:'Advisor details deleted'});
    } catch (err) {
      res.json({ success: false, message: 'advisor.advisorID.delete - Something went wrong', errMsg: err.message });
    }
  })

  module.exports = router;