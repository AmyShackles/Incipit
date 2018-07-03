const cardRoutes = require('../cards/cardRoutes');

module.exports = function(server) {
    server.get('/', function (req, res) {
        res.send({ api: 'up and running' })
    });

    server.use('/api', cardRoutes);
}