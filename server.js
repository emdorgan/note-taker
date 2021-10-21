// the dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const db = require('./db/db.json')
const {v4 : uuidv4} = require('uuid')

// Port defined and express.js initialized
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware to: (respectively) read the public directory's assets (CSS and JS), encode data and allow express to read json
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// updates database when a new note has been saved or a note has been deleted
function updateDatabase(){
    const stringifiedNotes = JSON.stringify(db, null, "\t");

        fs.writeFile(`./db/db.json`, stringifiedNotes, (err) =>
            err
                ? console.error(err)
                : console.log(
                    `Database has been updated`
                )
        );
}

// Receives POST request when user hits the save button, puts the db.json into the database
app.post('/api/notes', (req, res) =>{
    console.log(`${req.method} request recieved to save note`)

    const {title, text} = req.body;

    if(title && text){
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        // db is called as a dependency and directly pushed to
        db.push(newNote);

        updateDatabase();

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

// DELETE request, iterates through the database, comparing the id to the submitted parameter;
app.delete('/api/notes/:id', (req, res) =>{
    // deconstructs the req object, sets id param to an ID;
    const { id } = req.params;

    // array method to find the index associated with that ID
    const noteIndex = db.findIndex(obj => obj.id == id)

    // logs the title name to send as a response to the user
    let titleDeleted = db[noteIndex].title;

    // splice 1 item at that index
    db.splice(noteIndex, 1);
    //call the update database method
    updateDatabase();
    res.json(`Deleted the note titled ${titleDeleted}`);
})

// GET request: User gets sent the database of notes as a json.
app.get('/api/notes', (req, res) =>{
    res.json(db)
});

// GET request: User gets sent the notes.html page upon request
app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET request: User gets sent to index.html with the wildcard (*) setting to act as the root and catch any sort of weird url requests
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

// set up the host port
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);