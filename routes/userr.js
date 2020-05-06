var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const authf = require('../config/auth');

var auth = jwt({
  secret: "keepsecret",
  userProperty: 'payload'
});

const user = require('../database/models/user');

 // for User *************************************** 4. user
  
  // 1. get all users
  router.get('/', (req,res) => {
    user.find({})
    .then(users => res.send(users))
    .catch((err) => console.log(err))
  });


  // 3. get single user
  router.get('/:userid',auth, (req,res) => {
    user.find({ _id: req.params.userid })
      .then(users => res.send(users))
      .catch((err) => console.log(err))
  });
  
  // 4. update user
  router.patch('/:userid', (req,res) => {
    // console.log("------in patch");
    user.findOneAndUpdate({ _id: req.params.userid },{ $set: { email:req.body.email, address: req.body.address }},{new:true})
      .then(users => res.send(users))
      .catch((err) => console.log(err))
  });
  
  // 5. delete user
  router.delete('/:userid', (req,res) => {
    user.findByIdAndDelete(req.params.userid)
      .then(users => res.send(users))
      .catch((err) => console.log(err))
  });

  router.get('/get/count',(req,res) => {
    user.estimatedDocumentCount()
      .then(x => res.send({count:x}))
      .catch((err) => console.log(err))
  });

module.exports = router;