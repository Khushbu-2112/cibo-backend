var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const authf = require('../config/auth');

var auth = jwt({
  secret: "keepsecret",
  userProperty: 'payload'
});

const tsp = require('../database/models/tsp');


  // for TSP *************************************** 3. tsp
  
  // 1. get all tsp
  router.get('/', (req,res) => {
    tsp.find({})
    .then(tsps => res.send(tsps))
    .catch((err) => console.log(err))
  });
  
  // 2. add tsp
  router.post('/', (req,res) => {
    (new tsp({
      'name': req.body.name,
      'title': req.body.title,
      'contactNo': req.body.contactNo,
      'joiningDate': req.body.joiningDate,
      'year': req.body.year,
      'email': req.body.email,
      'password': req.body.password,
      'address': req.body.address,
      'area': req.body.area,
      'ratings': req.body.ratings,
      'timings': req.body.timings,
      'closed': req.body.closed,
      'image': req.body.image,
      'serves': req.body.serves
    }))
    .save()
    .then(tsps => res.send(tsps))
    .catch((err) => console.log(err))
  });
  
  // 3. get single tsp
  router.get('/:tspid',(req,res) => {
    tsp.find({ _id: req.params.tspid })
      .then(tsps => res.send(tsps))
      .catch((err) => console.log(err))
  });
  
  // 4. update tsp
  router.patch('/:tspid',(req,res) => {
    tsp.findOneAndUpdate({ _id: req.params.tspid }, { $set: req.body },{new:true})
      .then(tsps => res.send(tsps))
      .catch((err) => console.log(err))
  });
  
  // 5. delete tsp
  router.delete('/:tspid',(req,res) => {
    tsp.findByIdAndDelete(req.params.tspid)
      .then(tsps => res.send(tsps))
      .catch((err) => console.log(err))
  });
  
  router.get('/get/count',(req,res) => {
    tsp.estimatedDocumentCount()
    .then(x => res.send({count:x}))
    .catch((err) => console.log(err))
  });

  // find high rated tsp

  router.get('/get/highRated',(req,res) => {
    tsp.find({ratings: { $gte:3.5}}).sort({ratings: -1})
    .then(x => res.send(x))
    .catch((err) => console.log(err))
  });

  // find new tsp (added last week)

  router.get('/get/newOne',(req,res) => {
    tsp.find().sort({joiningDate: -1}).limit(10)
    .then(x => res.send(x))
    .catch((err) => console.log(err))
  });

  //find all tsp given array of ids
  router.post('/get/getTSP',(req,res) => {
    tsp.find({_id: { $in: req.body}})
    .then(x => res.send(x))
    .catch((err) => console.log(err))
  });

module.exports = router;