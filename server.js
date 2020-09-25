require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')

const port = process.env.PORT || 5000

const setupMiddleware = require('./_config/middleware')
const setupRoutes = require('./_config/routes');

const server = express();

setupMiddleware(server)
setupRoutes(server);

mongoose.Promise = global.Promise 

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, err => {
    if (err) {
        console.log(`That did not work as I had intended`)
    } else {
        console.log(`Incipit seems to be up and running!`)
    }
})

server.listen(port, () => {
    console.log(`Incipit is running on ${port}`)
})