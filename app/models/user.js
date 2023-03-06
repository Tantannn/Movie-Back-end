const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('strictQuery', false);

// videos: {type: String},

const User = new Schema({
    // _id: ObjectId,
    userId: String,
    token: String,

});
  
module.exports = mongoose.model('User', User)