const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  users: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  product: [
    {
      id: { type: mongoose.Schema.Types.ObjectId, ref: 'UsedAlbum' },
      name: { type: String, required: true },
      price: { type: Number, required: true },
      artist: { type: String, required: true },
      imageLink: { type: String, required: true },
    }
  ],
  totalCost: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);


  
module.exports = Order;
  
