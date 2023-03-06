const mongoose = require('mongoose');
const Schema = mongoose.Schema
mongoose.set('strictQuery', false);

// videos: {type: String},

const movieData = new Schema({
    // _id: ObjectId,
    popularity: Number,
    vote_average: Number,
    genre_ids: Number,
    title: String,
    name: String,
    original_title: String,

});
  
module.exports = mongoose.model('movieData', movieData)