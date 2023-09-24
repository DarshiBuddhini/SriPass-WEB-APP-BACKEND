// models/BusModel.js

const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
  bus_id: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String, 
    required: true, 
  },
  
});

const Bus = mongoose.model('Bus', busSchema);

module.exports = Bus;
