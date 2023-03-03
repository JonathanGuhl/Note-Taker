const notes = require('express').Router();
// random id creater npm
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile, } = require('../helper/fsUtil.js');
// reading from notes.json then parsing info
notes.get('/', ( req, res ) => {
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
});
// allows get request based off specific id number
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No tip with that ID');
          
      });
  });
// allows deletion of data from notes.json via specific id number
notes.delete('/:note_id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/notes.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.id == noteId);
        writeToFile('./db/notes.json', result);
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
// allows data to be added to notes.json via post method
notes.post('/', (req, res) => {
    console.log(req.body);
  
    const { title, text } = req.body;
  
    if (req.body) {
      const newNote= {
        title,
        text,
        id: uuidv4(),
      };
  
      readAndAppend(newNote, './db/notes.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
  });
  
  module.exports = notes;
  

