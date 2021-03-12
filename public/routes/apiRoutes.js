const jsonDB = require('../db/db.json');
const xpress = require('express');
const fs = require('fs');
const path = require('path');

let app = xpress();

module.exports = (app);

app.get('/api/notes', (req, res) => res.json(jsonDB));

app.post('/api/notes', (req, res) => {
    let takeNotes = req.body
        console.log(takeNotes);
        
    let newTakeNotes = {
        title: takeNotes.title,
        text: takeNotes.text,
    };

    jsonDB.push(newTakeNotes)
    fs.writeToFile(path.join(__dirname, '../db/db.json'),JSON.stringify(jsonDB), (error, data) => {
        if (error) throw error;
        return res.json(jsonDB);
    });
});