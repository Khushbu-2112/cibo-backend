var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
const authf = require('../config/auth');

var auth = jwt({
  secret: "keepsecret",
  userProperty: 'payload'
});

const mongoose = require('../database/mongoose');

const menu = require('../database/models/menu');
const order = require('../database/models/order');
const user = require('../database/models/user');
const tsp = require('../database/models/tsp');

// CRUD on 4 models before in this file now in own files
  
router.post('/register', authf.register);

router.post('/login', authf.login);

router.patch('/profile', authf.profile);
  
module.exports = router;