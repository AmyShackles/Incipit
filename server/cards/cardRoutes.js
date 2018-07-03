const router = require("express").Router();

const Deck = require("./deckModel");
const Card = require("./cardModel");

const sendUserError = (status, message, res) => {
  res.status(status).json({ error: message });
  return;
};

// Get all decks and cards  -- THIS ONE WORKS
router.get("/deck", (req, res) => {
  Deck.find()
    .populate("cards", "-__v")
    .select("-__v")
    .then(decks => {
      res.json({ decks });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Add a new deck -- THIS ONE WORKS
router.post("/deck", (req, res) => {
  const { name } = req.body;
  if (!name) {
    sendUserError(400, "A subject must have a name", res);
  } else {
    Deck.create(req.body)
      .then(newDeck => {
        res.status(201).json({ newDeck });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
  }
});
// GET all cards of a deck
router.get("/deck/:id", (req, res) => {
  const { rating } = req.query
    const { id } = req.params;
if (!rating) {
  Deck.findOne({ _id: id })
    .populate("cards", "-__v -subject")
    .select("name -_id")
    .then(deck => {
        if (deck !== null) {
      res.status(200).json({ deck });
        } else {
            res.status(404).json('This deck has been removed from Incipit')
        }
    })
    .catch(err => {
      sendUserError(500, err.message, res);
    });
} else {
    // GET all cards of a specific rating - WORKS (but not deck-specific)
  Card.find()
    .where({ rating: rating })
    .select("-__v")
    .populate("subject", "name")
    .then(cardsWithRating => {
      res.status(200).json({ cardsWithRating });
    })
    .catch(err => {
      sendUserError(404, err.message, res);
    });
    }
})

// Add a new card to a deck - THIS WORKS
router.post("/deck/:id", (req, res) => {
  const { id } = req.params;
  const { front, back } = req.body;
  if (!front || !back) {
    sendUserError(
      400,
      "All cards must contain a subject, a front, and a back",
      res
    );
  } else {
    Card.create({ subject: id, front, back })
      .then(newCard => {
        Deck.findByIdAndUpdate(
          id,
          { $push: { cards: newCard._id } },
          { new: true },
          (err, card) => {
            if (err) {
              res.send(err);
            } else {
              res.status(201).json({ newCard });
            }
          }
        );
      })
      .catch(err => {
        sendUserError(500, err, res);
      });
  }
});

// Edit the name of a deck - THIS WORKS
router.put("/deck/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  Deck.findByIdAndUpdate(id, updates, { new: true }).then(updatedDeck => {
    res.status(200).json({ updatedDeck });
  });
});

// Delete a deck - THIS WORKS
router.delete("/deck/:id", (req, res) => {
  const { id } = req.params;
  Deck.findByIdAndRemove(id)
    .then(deletedDeck => {
        Card.deleteMany({ subject: id })
            .then(deletedCards => {
      if (deletedDeck !== null) {
        res.json({ deletedDeck })
      } else {
        sendUserError(404, "This deck has already been removed", res);
      }
    })
    .catch(err => sendUserError(500, err.message, res));
}).catch(err => sendUserError(500, err.message, res))
});

// Get a specific card in a deck - THIS WORKS
router.get("/deck/:id/:cardId", (req, res) => {
  const { id, cardId } = req.params;
  Deck.findById(id)
    .then(selectedDeck => {
    Card.find({ _id: cardId, subject: id})
    .then(selectedCard => {
        if (selectedCard.length > 0) {
      res.status(200).json({ selectedCard });
        } else {
            sendUserError(404, 'There is no card with that ID in this deck', res)
        }
    })
    .catch(err => {
      sendUserError(404, err.message, res);
    });
    })
    .catch(err => {
        sendUserError(500, err.message, res)
    })
});

// Edit a specific card in a deck
router.put("/deck/:id/:cardId", (req, res) => {
  const { id, cardId } = req.params;
  const { front, back, rating, subject } = req.body;
  // if updating front and back - THIS WORKS (in either order)
   if (front && back) {
    Card.findByIdAndUpdate(cardId, { $set: { front, back } }, { new: true })
      .then(updatedCard => {
        res.status(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating front only - THIS WORKS
  } else if (front) {
    Card.findByIdAndUpdate(cardId, { $set: { front } }, { new: true })
      .then(updatedCard => {
        res.status(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating back only - THIS WORKS
  } else if (back) {
    Card.findByIdAndUpdate(cardId, { $set: { back } }, { new: true })
      .then(updatedCard => {
        res.status(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating rating - THIS WORKS
  } else if (rating) {
    Card.findByIdAndUpdate(cardId, { $set: { rating } }, { new: true })
      .then(updatedCard => {
        res.status(200).json({ updatedCard });
      })
      .catch(err => {
        res.status(200).json({ updatedCard });
      });
  } else if (subject) {
/* Updates deck of card
Updates the card so that the subject is changed to subject from req.body
Updates the deck that has the id of req.params.id
    to remove the card with the cardId
Updates the deck that has the id of the subject to be changed 
    to add the card with the cardId  - THIS WORKS */
        Card.findOneAndUpdate({ _id: cardId }, { $set: { "subject": subject }}, { new: true })
            .then(updatedCard => {
                    Deck.update({ _id: id }, { $pull: { cards: cardId }})
            .then(removedDeck => {
                Deck.update({ _id: subject}, { $push: { cards: cardId }})
            .then(addedDeck => {
                if (updatedCard !== null) {
                    let updateOfCard = Object.assign({}, updatedCard._doc, { removedDeck, addedDeck })
                    res.status(200).json({ updateOfCard })
                } else {
                    res.status(404).json( 'That card is no longer on Incipit' )
                }
            })
            .catch(err => {
                sendUserError(500, err.message, res)
            })
            })
            .catch(err => {
                sendUserError(500, err.message, res)
            })
            })
            .catch(err => {
                sendUserError(500, err.message, res)
            })
  }
});
/* Remove card from deck
Removes card by ID
Then does an update of the deck to remove card with cardId
THIS WORKS */
router.delete("/deck/:id/:cardId", (req, res) => {
  const { id, cardId } = req.params;
  Card.findByIdAndRemove(cardId)
    .then(removedCard => {
        Deck.update({ _id: id }, { $pull: { cards: cardId }})
            .then(removedFromDeck => {
                if (removedFromDeck !== null) {
                let cardRemoved = Object.assign({}, removedCard._doc, { removedFromDeck })
                res.status(200).json({ cardRemoved })
            } else {
                res.status(404).json('That card has already been removed from Incipit')
            }
            })
            .catch(err => {
                res.status(500).json(err.message)
            })
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

module.exports = router;
