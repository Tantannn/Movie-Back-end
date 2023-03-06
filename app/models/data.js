const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('strictQuery', false);

// videos: {type: String},

const Data = new Schema({
    // _id: ObjectId,
    videos: Array,
    id: Number,
});
  
module.exports = mongoose.model('Data', Data)