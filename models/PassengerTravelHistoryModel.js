// models/PassengerTravelHistory.js
const mongoose = require('mongoose');

const passengerTravelHistorySchema = new mongoose.Schema({
    PassengerID: {
        type: String, // Assuming PassengerID is a string
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    cost: {
        type: Number,
        required: true,
    },
    RouteNo: {
        type: String,
        required: true,
    },

});

const PassengerTravelHistory = mongoose.model('PassengerTravelHistory', passengerTravelHistorySchema);

module.exports = PassengerTravelHistory;
