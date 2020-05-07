const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/cibodb', { useNewUrlParser: true ,useCreateIndex:true , useUnifiedTopology: true ,useFindAndModify: false} )
  .then( () => { console.log('Database connected')})
  .catch( (err) => { console.log(err)});

// mongoose.connect('mongodb+srv://khushi:mongodb@examplejs-owe58.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true ,useCreateIndex:true , useUnifiedTopology: true ,useFindAndModify: false} )
//   .then( () => { console.log('Database connected')})
//   .catch( (err) => { console.log(err)});


module.exports = mongoose;
