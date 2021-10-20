// the dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')


const PORT = 3001;

const app = express();

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// User gets sent the notes.html
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);