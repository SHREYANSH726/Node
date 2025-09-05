
const express = require('express');
const notesController = require('../controller/note.Controller');

const checkisAuth = require('../middleware/auth');
const NotesRouter = express.Router();


NotesRouter.get('/test',notesController.test)
NotesRouter.get('/test',notesController.test);
NotesRouter.post('/create',checkisAuth,notesController.create)

module.exports = NotesRouter;