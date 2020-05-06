var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const authf = require('../config/auth');

var auth = jwt({
  secret: "keepsecret",
  userProperty: 'payload'
});

const menu = require('../database/models/menu');



// for Menu *************************************** 1. Menu

// 1. get all menus
router.get('/', (req,res) => {
    menu.find({})
    .then(menus => res.send(menus))
    .catch((err) => console.log(err))
  });
  
  // 2. add menu
  router.post('/', (req,res) => {
    (new menu({
      'orderType': req.body.orderType,
      'menuType': req.body.menuType,
      'name': req.body.name,
      'items': req.body.items,
      'price': req.body.price,
      'offer': req.body.offer,
      'availability': req.body.availability,
      'enteredBy': Object(req.body.enteredBy)
    }))
    .save()
    .then(menus => res.send(menus))
    .catch((err) => console.log(err))
  });
  
  // 3. get single menu
  router.get('/:menuid',(req,res) => {
    menu.find({ _id: req.params.menuid })
      .then(menus => res.send(menus))
      .catch((err) => console.log(err))
  });
  
  // 4. update menu
  router.patch('/:menuid',(req,res) => {
    menu.findOneAndUpdate({ _id: req.params.menuid } ,{ $set: req.body }, {new:true})
      .then(menus => res.send(menus))
      .catch((err) => console.log(err))
  });
  
  // 5. delete menu
  router.delete('/:menuid',(req,res) => {
    menu.findByIdAndDelete(req.params.menuid)
      .then(menus => res.send(menus))
      .catch((err) => console.log(err))
  });
  
  // get menus of particular tsp
  router.get('/gettsp/:tspid',(req,res) => {
    menu.find({enteredBy:req.params.tspid})
      .then(menus => res.send(menus))
      .catch((err) => console.log(err))
  });

module.exports = router;