const express = require('express');

notesRouter = require('./notes.js');

const app = express();

app.use('/notes', notesRouter);

module.exports = app;