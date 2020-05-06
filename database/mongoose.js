const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/cibodb', { useNewUrlParser: true ,useCreateIndex:true , useUnifiedTopology: true ,useFindAndModify: false} )
  .then( () => { console.log('Database connected')})
  .catch( (err) => { console.log(err)});

module.exports = mongoose;
