const express = require('express');
const notesRouter = require('./notes');

const app = express();

// makes /notes default initial location to all routes implemented in notesRouter module
app.use('/notes', notesRouter);

module.exports = app;