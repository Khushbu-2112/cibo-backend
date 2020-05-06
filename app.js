const express = require('express');

const path = require('path');

const http = require('http');
// const mongoose = require('./database/mongoose');
const router = require('./routes/index');
const menuRoute = require('./routes/menur');
const userRoute = require('./routes/userr');
const tspRoute = require('./routes/tspr');
const orderRoute = require('./routes/orderr');

const app = express();
const PORT = 3000;

// use allow to use middleware

app.use(express.json());

// CORS

app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, HEAD, PUT, PATCH, OPTIONS, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const cors = require('cors');
app.use(cors());

const passport = require('passport');

require('./config/passport');

app.use(passport.initialize());

app.use('/', router);
app.use('/menus', menuRoute);
app.use('/tsplist', tspRoute);
app.use('/users', userRoute);
app.use('/orders', orderRoute);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render('error', {
          message: err.message,
          error: err
      });
  });
}

app.listen(PORT, ()=> { console.log(`Server started on port ${PORT}`) });
