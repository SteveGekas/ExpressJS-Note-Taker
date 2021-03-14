const page = require('../db/db.json');
const fs = require('fs');
const path = require('path');

module.exports = (app) => {

    app.get('/api/notes', (req, res) => res.json(page));

    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        console.log(newNote);
        
        page.push(newNote)
        fs.writeToFile(path.join(__dirname, '../db/db.json'), JSON.stringify(page), (error, data) => {
            if (error) throw error;
            return res.json(page);
        });
    });

    app.delete('/api/notes/:id', (req, res) => {
        const deleteNote = req.params.id
        console.log(deleteNote);

        for (let i = 0; i < page.length; i++) {
            if (deleteNote === deleteNote[i].id) {
                page.splice(i, 1);
                fs.writeToFile(path.join(__dirname, '../db/db.json'), JSON.stringify(page), (error, data) => {
                    if (error) throw error;
                    return page;
                });
            }
        }
    });
};


