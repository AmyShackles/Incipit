const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const cardSchema = new mongoose.Schema({
    subject: [{
        type: ObjectId,
        ref: 'Deck'
    }],
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
      type: String,
      default: '0'
    }
})

module.exports = mongoose.model("Card", cardSchema);