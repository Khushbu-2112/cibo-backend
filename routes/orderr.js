var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const authf = require('../config/auth');

var auth = jwt({
  secret: "keepsecret",
  userProperty: 'payload'
});

const order = require('../database/models/order');

// for Order *************************************** 2. order
  
  // 1. get all order
  router.get('/', (req,res) => {
    order.find({})
    .then(orders => res.send(orders))
    .catch((err) => console.log(err))
  });
  
  // 2. add order
  router.post('/', (req,res) => {
    (new order({
      'deliveryAddress': req.body.deliveryAddress,
      'totalAmount': req.body.totalAmount,
      'orderedOn': req.body.orderedOn,
      'status': req.body.status,
      'userId': Object(req.body.userId),
      'tspId': Object(req.body.tspId),
      'menuId': Object(req.body.menuId)
    }))
    .save()
    .then(orders => res.send(orders))
    .catch((err) => console.log(err))
  });
  
  // 3. get single order
  router.get('/:orderid',(req,res) => {
    order.find({ _id: req.params.orderid })
      .then(orders => res.send(orders))
      .catch((err) => console.log(err))
  });
  
  // 4. update order
  router.patch('/:orderid',(req,res) => {
    order.findOneAndUpdate({ _id: req.params.orderid } , { $set: req.body }, {new:true})
      .then(orders => res.send(orders))
      .catch((err) => console.log(err))
  });
  
  // 5. delete order
  router.delete('/:orderid',(req,res) => {
    order.findByIdAndDelete(req.params.orderid)
      .then(orders => res.send(orders))
      .catch((err) => console.log(err))
  });

  router.get('/get/count',(req,res) => {
    order.estimatedDocumentCount()
    .then(x => res.send({count:x}))
    .catch((err) => console.log(err))
  });

  //total orders of tsp
  router.get('/gettsp/:tspid',(req,res) => {
    order.find( {tspId: req.params.tspid})
    .then(orders => res.send({nooforder:orders.length}))
    .catch((err) => console.log(err))
  });

  // find orders of particular user
  router.get('/getuser/:userid',(req,res) => {
    order.find( {userId: req.params.userid})
    .then(orders => res.send(orders))
    .catch((err) => console.log(err))
  });
 
  // find trending tsp 
  router.get('/get/trending',(req,res) => {
    order.aggregate([
      {
        $group:{
          _id:"$tspId",
          count:{ $sum: 1}
        }
      }
    ]).sort({count: -1}).limit(10)
    .then(x => res.send(x))
    .catch((err) => console.log(err))
  });

module.exports = router;