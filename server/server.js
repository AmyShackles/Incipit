require('dotenv').config();
const express = require('express')
const db = require('./_config/db');
const setupMiddleware = require('./_config/middleware')
const setupRoutes = require('./_config/routes');

const server = express();

setupMiddleware(server)
setupRoutes(server);

db.connectTo('incipit')
    .then(() => {
        console.log('\n *** Incipit connected to database **\n')
        server.listen(5000, () => {
            console.log('\n*** INCIPIT is running on a port **\n')
        })
    })
    .catch(err => {
        console.log('\n *** Incipit is definitely not connected to a database ***\n')
    })