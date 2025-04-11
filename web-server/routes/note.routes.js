const express = require("express");
const fileUpload = require("express-fileupload");
const Note = require("../model/note.model");
const errorHandler = require("../helpers/errorhandler.helper");
const filesPayloadExists = require("../middleware/filePayloadExists");
const path = require('path');

let notesRouter = express.Router();
// CRUD Routes
//----------------------------------------
notesRouter.get("/data",function(req, res){
    console.log("get request for data recieved");
    Note.find().then( notes => res.status(200).json(notes) ).catch(error => errorHandler(error) );
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

notesRouter.post(
  "/upload",
  fileUpload({ createParentPath: true }),
  filesPayloadExists,
  (req, res) => {
    const files = req.files;
    console.log(files);

    Object.keys(files).forEach((key) => {
      const filepath = path.join(__dirname, "files", files[key].name);
      files[key].mv(filepath, (err) => {
        if (err) return res.status(500).json({ status: "error", message: err });
      });
    });
    return res.json({ status: "succes", message: Object.keys(files).toString() });
 
 }
);

notesRouter.delete("/delete/:id",function(req, res){
    console.log("delete request recieved for note with id: "+req.params.id);
    
    Note.findByIdAndDelete({_id : req.params.id})
    .then(deletednote => {
        res.status(200).json({"message": deletednote.title+" was deleted"})
    })
    .catch(error => errorHandler(error) );
});

notesRouter.get("/edit/:id",function(req, res){
    console.log("Edit request recieved for note with id "+req.params.id);

    Note.findById(req.params.id)
    .then(note2update => res.status(200).json(note2update))
    .catch(error => errorHandler(error));
});

notesRouter.put("/edit/:id",function(req, res){
    console.log("Put request recieved for note with id "+req.params.id);

    Note.findById(req.params.id)
    .then( updatedNote => {
        updatedNote.title = req.body.title;
        updatedNote.subject = req.body.subject;
        updatedNote.body = req.body.body;
        //updatedNote.description = req.body.description;
        updatedNote.save()
        .then((noteupdated)=>{
            res.status(200).json({noteupdated});
            console.log(updatedNote._id +"Note Updated Successfully:");
        })
        .catch(error => errorHandler(error));
    })
    .catch(error => errorHandler(error))
});

module.exports = notesRouter;