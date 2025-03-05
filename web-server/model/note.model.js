const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Note = mongoose.model("Note", new Schema(
    {
        id: ObjectId,
        title : String,
        body: String
    }
));

module.exports = Note;

