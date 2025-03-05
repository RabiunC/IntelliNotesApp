const mongoose = require("mongoose");

let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

let Noteuser = mongoose.model("Noteuser", new Schema(
    {
        id: ObjectId,
        name : String,
        email: String,
        password: String        
    }
));

module.exports = Noteuser;

