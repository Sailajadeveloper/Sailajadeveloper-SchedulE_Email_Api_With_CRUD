const mongoose = require('mongoose');

const url = `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`;
mongoose.connect(url,(err)=>{
  if(err){
    console.log("Error While Connecting to the MongoDb ", err);
    process.exit();
  }else{
    console.log(mongoose.connection.readyState,"MongoDb Connection Successful!")
  }
})
module.exports = { mongoose }