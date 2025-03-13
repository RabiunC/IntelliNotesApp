const express = require("express");
const mongoose = require("mongoose");

const errorHandler = require("./helpers/errorhandler.helper")
const config = require("./config.json");

const cors = require("cors");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const notesRouter = require("./routes/note.routes");
const usersRouter = require("./routes/noteuser.routes");

const app = express();
app.use(express.json()).use(cors()).use(bodyParser.json()).use(cookieParser());

app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Accepts, Authorization'
}))

app.use('/notes', notesRouter);
app.use('/users', usersRouter);

const url  = config.cloudDB;

mongoose.connect(url).
then(res => console.log("DB Connected...!"))
.catch(error => errorHandler(error));

app.listen(config.port, config.host, function(error){
    if(error){
        console.log(errorHandler(error));}
    else{
        console.log(`Server is now live on ${config.host}:${config.port}`); }
})




