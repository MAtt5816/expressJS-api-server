const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Routes
app.use('/', [
    require('./routes/general'),
    require('./routes/students')
]);

module.exports = app;