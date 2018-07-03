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
    .populate("cards", "-subject -_id -__v")
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
    .populate("cards", "-_id -__v -subject")
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
    .select("-_id -__v")
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
        res.json({ deletedDeck });
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
  // if updating front, back, and subject
  if (subject) {
    Deck.findByIdAndUpdate({ id }, subject, { upsert: true, new: true });
  }
  if (front && back && subject) {
    Card.findByIdAndUpdate(
      cardId,
      { $set: { front, back, subject: subject } },
      { new: true }
    )
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating front and back
  } else if (front && back) {
    Card.findByIdAndUpdate(cardId, { $set: { front, back } }, { new: true })
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating back and subject
  } else if (back && subject) {
    Card.findByIdAndUpdate(
      cardId,
      { $set: { back, subject: subject } },
      { new: true }
    )
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating front and subject
  } else if (front && subject) {
    Card.findByIdAndUpdate(
      query,
      { $set: { front, subject: subject } },
      { new: true }
    )
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating front
  } else if (front) {
    Card.findByIdAndUpdate(query, { $set: { front } }, { new: true })
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating back
  } else if (back) {
    Card.findByIdAndUpdate(query, { $set: { back } }, { new: true })
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        sendUserError(500, err.message, res);
      });
    // if updating rating
  } else if (rating) {
    Card.findByIdAndUpdate(cardId, { $set: { rating } }, { new: true })
      .then(updatedCard => {
        res.send(200).json({ updatedCard });
      })
      .catch(err => {
        res.send(200).json({ updatedCard });
      });
  }
});

router.delete("/deck/:subject/:id", (req, res) => {
  const { subject, id } = req.params;
  Deck.findOneAndRemove({ name: subject, "cards._id": id })
    .then(deletedCard => {
      if (deletedCard !== null) {
        res.json({ deletedCard });
      } else {
        sendUserError(404, "This card has already been removed", res);
      }
    })
    .catch(err => sendUserError(500, err.message, res));
});

module.exports = router;
