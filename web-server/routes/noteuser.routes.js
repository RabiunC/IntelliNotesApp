const express = require("express");
const NoteUser = require("../model/noteuser.model");
const errorHandler = require("../helpers/errorhandler.helper");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let usersRouter = express.Router();
// CRUD Routes
//----------------------------------------
usersRouter.get("/data", function (req, res) {
  console.log("get request for data recieved");
  NoteUser.find()
    .then((noteusers) => res.status(200).json(noteusers))
    .catch((error) => errorHandler(error));
});

usersRouter.post("/login", async function (req, res) {
  try {
    console.log("post request for login validation");
    const founduser = await NoteUser.findOne({ email: req.body.email });

    if (bcrypt.compareSync(req.body.password, founduser.password)) {
      const token = jwt.sign(
        {
          email: founduser.email,
          userId: founduser._id,
        },
        "somebiiiigtokenoostringggg",
        { expiresIn: "1h" }
      );
      res.status(200).json({ message: "Login successful", token: token });
      
    } else {
      res.status(401).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
  }
});

usersRouter.post("/register", async function (req, res) {
  try {
    console.log("add user post request recieved", req.body);
    //BCRYPT PASSWORD
    const hashedPW = bcrypt.hashSync(req.body.password, 12);
    const hashedUser = {
      name: req.body.name,
      email: req.body.email,
      password: hashedPW,
    };
    const noteUser = new NoteUser(hashedUser);

    await noteUser.save();
    const token = jwt.sign(
      {
        email: noteUser.email,
        userId: noteUser._id,
      },
      "somebiiiigtokenoostringggg",
      { expiresIn: "1h" }
    );
    res.status(200)
      .json({ message: "Registered Successfully", token: token });

  } catch (error) {
    console.log(error);
  }
});

usersRouter.get("/edit/:id", function (req, res) {
  NoteUser.findById(req.params.id)
    .then((user2update) => res.status(200).json(user2update))
    .catch((error) => errorHandler(error));
});

module.exports = usersRouter;
