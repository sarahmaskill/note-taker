const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();

currentID = notes.length;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.get('/api/notes', (req, res) => res.status(200).json(notes)) 

// pull home page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//pull notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

//if page not found send to home
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);

//API ROUTES

app.post("/api/notes", (req, res) => {
    var newNote = req.body;
    newNote["id"] = currentID +1;
    currentID++;
    console.log(newNote);
    notes.push(newNote);
    newNotes();
    return res.status(200).end();
});

function newNotes() {
    fs.writeFile("db/db.json", JSON.stringify(notes), function (err) {
        if (err) {
            console.log("error")
            return console.log(err);
        }
        console.log("Success!");
    });
}

app.listen(PORT, () => {
  console.log(`Note Taker listening at http://localhost:${PORT}`);
});