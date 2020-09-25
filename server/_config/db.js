const mongoose = require('mongoose');

module.exports = {
    connectTo: function() {
        return mongoose.connect(process.env.MONGO_URI)
    }
}