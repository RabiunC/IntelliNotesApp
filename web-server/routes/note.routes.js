const express = require("express");
const Note = require("../model/note.model");
const errorHandler = require("../helpers/errorhandler.helper");

let notesRouter = express.Router();
// CRUD Routes
//----------------------------------------
notesRouter.get("/data",function(req, res){
    console.log("get request for data recieved");
    Notes.find().then( notes => res.status(200).json(notes) ).catch(error => errorHandler(error) );
});

notesRouter.post("/add", function(req, res){
    console.log("add new note post request recieved", req.body);
    
    let note = new Note(req.body);
    note.save().then(function(dbres){
        res.json({ 'message': dbres.title+' was added'})
    })
    .catch(function(error){
        errorHandler(error)
    })
})

notesRouter.delete("/delete/:id",function(req, res){
    console.log("delete request recieved for note with id: "+req.params.id);
    
    Notes.findByIdAndDelete({_id : req.params.id})
    .then(deletednote => {
        res.status(200).json({"message": deletednote.title+" was deleted"})
    })
    .catch(error => errorHandler(error) );
});

notesRouter.get("/edit/:id",function(req, res){
    console.log("Edit request recieved for note with id "+req.params.id);

    Notes.findById(req.params.id)
    .then(note2update => res.status(200).json(note2update))
    .catch(error => errorHandler(error));
});

notesRouter.put("/edit/:id",function(req, res){
    console.log("Put request recieved for note with id "+req.params.id);

    Notes.findById(req.params.id)
    .then( updateNote => {
        updatedNote.title = req.body.title;
        updatedNote.subject = req.body.subject;
        updatedNote.description = req.body.description;
        updateNote.save()
        .then((noteupdated)=>{
            res.json({"updatedmessage":noteupdated})
        })
        .catch(error => errorHandler(error));
    })
    .catch(error => errorHandler(error))
});

module.exports = notesRouter;