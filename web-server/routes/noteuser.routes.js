const express = require("express");
const NoteUser = require("../model/noteuser.model");
const errorHandler = require("../helpers/errorhandler.helper");


const bcrypt =  require('bcryptjs');
const jwt = require('jsonwebtoken');

let usersRouter = express.Router();
// CRUD Routes
//----------------------------------------
usersRouter.get("/data",function(req, res){
    console.log("get request for data recieved");
    NoteUser.find().then( noteusers => res.status(200).json(noteusers)).catch(error => errorHandler(error) );
});

usersRouter.post("/login",function(req, res){
    console.log("post request for login validation");
    NoteUser.findOne({email: req.body.email}).then(founduser => {
        console.log(founduser);
        if(!founduser){
            res.status(404).json({ 'message': req.body.email +' not found'})
        }
        else if(req.body.password === founduser.password){
            res.json({ message: "Login successful" });
        }
        else{
            res.status(401).json({ message: "Incorrect password" });
        }
    })
    .catch(error => errorHandler(error));
   }
);

usersRouter.post("/register", function(req, res){
    console.log("add user post request recieved", req.body);
    
    const hashedPW = bcrypt.hashSync(req.body.password, 12);
    const hashedUser = {
        name: req.body.name,
        email: req.body.email,
        password: hashedPW
    }
    let noteUser = new NoteUser(hashedUser);
    noteUser.save().then( dbres => {
        res.json({ 'message': dbres.name+' was registered'})
    })
    .catch(function(error){
        errorHandler(error)
    })
})

usersRouter.get("/edit/:id",function(req, res){
    NoteUser.findById(req.params.id)
    .then(user2update => res.status(200).json(user2update))
    .catch(error => errorHandler(error));
});

module.exports = usersRouter;