const express = require('express');
const path = require('path');
const fs = require('fs');
const uniqid = require('uniqid');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


app.get('*', (req,res) => 
    res.sendFile(path.join(_dirname, '/public/index.html')));
    
    app.get('/api/notes', (req, res) => {
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            res.send(data);
        })
    });
    
    app.get('/notes', (req, res) =>
    res.sendFile(path.join(_dirname, '/public/notes.html')));
    
    app.post('/api/notes', (req, res) => {
        fs.readFile('/db/db.json', 'utf-8', (err, data) => {
            const notes = JSON.parse(data)
            const newNote = req.body
            newNote.id = uniqid()
            notes.push(newNote)
            fs.writeFile('./db./db.json', JSON.stringify(notes), (err) => {
                res.json(newNote)
            })
        })
    });

    app.delete('/api/notes/:id', (req, res) => {
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            const notes = JSON.parse(data)
            const updatedNotes = notes.filter(note => note.id !== req.params.id)
            fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (err) => {
                res.send(200)
            })
        })
    });
    
    app.listen(PORT, () =>
    console.log(`Listening on ${PORT}`));