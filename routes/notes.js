const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile, } = require('../helper/fsUtil.js');

notes.get('/', ( req, res ) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});

notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        console.log('noteId:', noteId);
        console.log('json:', json);
        console.log('result:', result);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
          
      });
  });
  
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        console.log('noteId:', noteId);
        console.log('json:', json);
        console.log('result:', result);
        console.log(req.params);
        writeToFile('./db/notes.json', result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });

notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote= {
        title,
        text,
        note_id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  
  module.exports = notes;
  

