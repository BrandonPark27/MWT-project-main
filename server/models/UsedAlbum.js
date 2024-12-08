const mongoose = require('mongoose');


const usedAlbumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  releaseYear: { type: Number, required: true },
  artist: { type: String, required: true },
  genres: { type: [String], required: true }, 
  numOfSongs: { type: Number, required: true },
  listenTime: { type: Number, required: true }, 
  imageLink: { type: String, required: true },
  price: { type: Number, required: true },  
  conditionDescription: { type: String, required: true }, 
});

const UsedAlbum = mongoose.model('UsedAlbum', usedAlbumSchema);

module.exports = UsedAlbum;