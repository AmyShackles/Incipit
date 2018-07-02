const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    subject: {
        type: String,
        unique: true,
        required: true
    },
    front: {
        type: String,
        unique: true,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }
})

module.exports = mongoose.model('Card', cardSchema)