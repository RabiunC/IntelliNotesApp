const express = require("express");
const NoteUser = require("../model/noteuser.model");
const errorHandler = require("../helpers/errorhandler.helper");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = '4a618c12d355ecec4f92152d813f0e71af1f83956356f34c647ac29dc92324b65d35534e22bd826fb1a1b89c50206da23cf6128c24122577ea0336ded34871574472c4d4ccbef587c7630c67e73366f9493f337a5744afced3ec83e459991ffed32a1e78abd7536fdacdfeb00d26fd6dc730078ac0f3feafeca3cb4e9d262956732eb50a9c2dd7d62658c5fb2f26e7b7221bc119ac462b6b43b0a6f3977220568e883cc3cdb778083bee81d6edb5f932afe5057df2a3d79b10725cc428226f784d3e9b4f06c82dfaf471ec703ec1cf9b9b105885c1f54cbeb5e2423cd3ac746ade66d504ed0ba0d524f7d05b65c188fa72a23c5fff7bb25a1e75f3216869386c';

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
        JWT_SECRET,
        { expiresIn : 60 }
      );
      res.status(200).json({ message: "Login successful, Enjoy ur Token", data: token });
      //return res.json({status: 'ok', data: token});
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
