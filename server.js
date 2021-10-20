// the dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const {v4 : uuidv4} = require('uuid')

const notesList = [];

// Port defined and express.js initialized
const PORT = 3001;
const app = express();

// Middleware to (respectively) read the public directory's assets (CSS and JS), encode data and allow express to read json
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/api/notes', (req, res) =>{
    console.log(`${req.method} request recieved to log note`)

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            note_id: uuidv4()
        };
        notesList.push(newNote);

        const response = {
            status: "success",
            body: newNote,
        };

        console.log(response);
        res.json(response);
    } else{
        res.json("failed to save note");
    }
});

// User gets sent to landing page (index.html) (note: change to * GET command later)
app.get('/api/notes', (req, res) =>{
    res.json(db)
    }
);

// User gets sent the notes.html page upon request
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// Root, user gets sent to index.html
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// set up the host port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);