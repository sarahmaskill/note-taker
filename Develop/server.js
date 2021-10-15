const express = require('express');
const path = require('path');
const notes = require('./db/db.json');
const fs = require('fs');


const PORT = process.env.port || 3001;

const app = express();

currentID = notes.length;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

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
app.get('/api/notes', (req, res) => res.json(notes));

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

// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
app.get('/api/notes', (req, res) => {
    // Send a message to the client
    res.json(`${req.method} request received to get notes`);
  
    // Log our request to the terminal
    console.info(`${req.method} request received to get notes`);
  });
  
app.listen(PORT, () => {
  console.log(`Note Taker listening at http://localhost:${PORT}`);
});