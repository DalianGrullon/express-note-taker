const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const {readFromFile, readAndAppend, writeToFile} = require('../helpers/fsUtils');

// Responds with all json data from db when navigating to /notes
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Deletes the user specified note by passing in the note id to the url
notes.delete('/:id', (req, res) => {
    // parses id from url
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Creates a new array with all data found in db file excluding the url specified note id
        const result = json.filter((note) => note.id !== noteId);

        writeToFile('./db/db.json', result);

        res.json(`Item ${noteId} has been deleted 🗑️`);
    });
});

notes.post('/', (req, res) => {
    console.log(req.body);
  
    // destructures the requests body and creates bindings out of its properties
    const { title, text } = req.body;
  
    // creates a new note object if the requests body exists
    if (req.body) {
      const newNote = {
        title,
        text,
        // assigns a random id to each new note
        id: uuidv4(),
      };
      
      readAndAppend(newNote, './db/db.json');
      res.json(`Tip added successfully 🚀`);
    } else {
      res.error('Error in adding tip');
    }
});


module.exports = notes;