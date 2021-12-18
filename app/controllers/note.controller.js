const { response } = require('express');
const Note = require('../models/note.model')

// Create and a new Note 
exports.create = (req, res) => {
    //Validate request
    if(!req.body.content){
        return res.status(400).send({
            message: 'Note must containt all fields'
        });
    }

    // Create a Note
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })

    // Save Note in the database
    note.save()
    .then( data => {
        res.send(data);
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Some error ocurred while creating the Note."
        })
    })
};

// Retrieve all notes
exports.findAll = (req, res) => {
    Note.find()
    .then( notes => {
        res.send(notes);
    }).catch( err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

// Retrieve a note with noteId
exports.findOne = (req, res) =>{
    Note.findById(req.params.noteId)
    .then( note =>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId 
            })
        }
        res.send(note);
    }).catch(err => {
        if(err.kind == 'ObjectId'){
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId 
            });
        }
        return res.status(500).send({
            message: 'Error retrieving note with id ' + req.params.noteId
        });
    });
};

exports.update = (req, res) => {
    if(!req.bosy.content){
        return res.status(400).send({
            message: "Note content cant be empty"
        })
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "untitled Note",
        content: req.body.content
    }, {new: true})
    .then( note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            })
        }
        res.send(note);
    }).catch( err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    })
}

exports.delete = (req, res) => {
    Note.findByIdAndRemove(req.params.noteId)
    .then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
}