const router = require('express').Router()

const Card = require('./Card');

const sendUserError = (status, message, res) => {
    res.status(status).json({ error: message });
    return;
}

router.get('/', (req, res) => {
    Card.find()
        .select('-_id, -__v')
        .then(cards => {
            console.log('cards: ', cards)
            res.json(cards)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/category', (req, res) => {
    const { subject } = req.body;
    if (!subject) {
        sendUserError(400, "Subjects must have categories", res)
    } else {
        Card.create(req.body)
            .then(newSubject => {
                res.status(201).json({ newSubject })
            })
            .catch(err => {
                sendUserError(500, err.message, res)
            })
    }
})

router.get('/category/:subject', (req, res) => {
    const { subject } = req.params;
    const { rating } = req.query;
    if (rating) {
        let ratingQuery = new RegExp(rating, "i");
        Card.find()
        .where({ rating: ratingQuery })
        .then(cardsWithRating => {
            res.status(200).json({ cardsWithRating })
        })
        .catch(err => {
            sendUserError(404, err.message, res)
        })
    } else {
    Card.find({ subject: subject })
        .select('-__v -_id')
        .then(subject => {
            if (subject !== null) {
                res.status(200).json({ subject })
            } else {
                sendUserError(404, 'This note is no longer available', res)
            }
        })
        .catch(err => sendUserError(500, err.message, res))
    }
})
router.post('/category/:subject', (req, res) => {
    const { subject } = req.params;
    const { subject, front, back } = req.body;
    if (!subject || !front || !back) {
        sendUserError(400, 'All cards must contain a subject, a front, and a back', res)
    } else {
    Card.create(req.body)
        .then(newCard => {
            res.status(201).json({ newCard })
        })
        .catch(err => {
            sendUserError(500, err.message, res)
        })
    }
})
router.put('/category/:subject', (req, res) => {
    const { subject } = req.params;
    const updates = req.body
    Card.findOneAndUpdate(subject, updates, { new: true })
        .then(updatedSubject => {
            res.status(200).json({ updatedSubject })
        })
})

router.delete('/category/:subject', (req, res) => {
    const { subject } = req.params;
    Card.findOneAndRemove(subject)
        .then(deletedSubject => {
            if (deletedSubject !== null) {
                res.json({ deletedSubject })
            } else {
                sendUserError(404, 'This subject has already been removed', res)
            }
        })
        .catch(err => sendUserError(500, err.message, res))
})

router.get('/category/:subject/:id', (req, res) => {
    const { subject, id } = req.params;
    Card.find({ subject: subject, id: id })
        .then(card => {
            res.status(200).json({ card })
        })
        .catch(err => {
            sendUserError(404, err.message, res)
        })
})

router.get('/category/:subject', (req, res) => {
    const { subject } = req.params;

})

router.put('/category/:subject/:id', (req, res) => {
    const { subject, id } = req.params;
    const updates = req.body
    let query = { subject, id }
    Card.findOneAndUpdate(query, updates, { new: true })
        .then(updatedCard => {
            res.send(200).json({ updatedCard })
        })
        .catch(err => {
            sendUserError(500, err.message, res)
        })   
})

router.delete('/category/:subject/:id', (req, res) => {
    const { subject, id } = req.params;
    Card.findOneAndRemove({ subject, id })
        .then(deletedCard => {
            if (deletedCard !== null) {
                res.json({ deletedCard })
            } else {
                sendUserError(404, 'This card has already been removed', res)
            }
        })
        .catch(err => sendUserError(500, err.message, res))
})
module.exports = router