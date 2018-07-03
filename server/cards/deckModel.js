const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const deckSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  cards: [{
    type: ObjectId,
    ref: 'Card'
  }],
  category: {
    type: String,
    enum: ['public', 'private']
  }
});

module.exports = mongoose.model("Deck", deckSchema);
