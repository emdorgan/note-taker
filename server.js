// the dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')


const PORT = 3001;

const app = express();

app.use(express.static('public'));

// use encoding and express.json so that the express.js can actually read json notation
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User gets sent to landing page (index.html) (note: change to * GET command later)

app.get('/api/notes', (req, res) =>{
    res.json(db)
    }
);

// User gets sent the notes.html page upon request
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);