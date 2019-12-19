const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary.config");

authRoutes.get("/view/:id", (req, res) => {
  User.findById(req.params.id)
    .then(theUser => {
      res.json(theUser);
    })
    .catch(err => console.log("error finding user profile"));
});

authRoutes.post("/upload", uploader.single("imgPath"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ secure_url: req.file.secure_url });
});

authRoutes.post("/signup", (req, res) => {
  const {
    username,
    password,
    age,
    level,
    email,
    experience,
    role,
    imgPath
  } = req.body.user;

  if (!username || !password) {
    res.status(400).json({ message: "Provide username and password" });
    return;
  }
  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }
    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      password: hashPass,
      age: age,
      level: level,
      email: email,
      experience: experience,
      role: role,
      imgPath: imgPath
    });

    aNewUser.save(err => {
      if (err) {
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }
      req.login(aNewUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }
        res.status(200).json(aNewUser);
      });
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("user-login", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }
    if (!theUser) {
      res.status(401).json(failureDetails);
      return;
    }
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res) => {
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

authRoutes.post("/editUser", (req, res) => {
  const { username, email, age, level, experience, imgPath } = req.body.user;

  User.findByIdAndUpdate(
    req.user._id,
    {
      username,
      email,
      age,
      level,
      experience,
      imgPath
    },
    { new: true }
  )
    .then(us => res.status(200).json(us))
    .catch(error => console.log(error));
});

module.exports = authRoutes;
