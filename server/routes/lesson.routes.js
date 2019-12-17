const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson.model");
const mongoose = require("mongoose");

// Find Lessons

router.get("/getAllLessons", (req, res) => {
  Lesson.find()
    .populate("creatorIdTeacher", "email")
    .populate("creatorIdUser", "email")
    .then(AllLessons => {
      res.json(AllLessons);
    })
    .catch(err => console.log("DB error", err));
});

router.get("/:id", (req, res) => {
  Lesson.findById(req.params.id)
    .then(theNewLesson => res.status(200).json(theNewLesson))
    .catch(err => console.log("error!"));
});

// Create Lessons

router.post("/createLesson", (req, res) => {
  const { title, description, location, participants } = req.body;

  if (req.user.role !== "Teacher") {
    Lesson.create({
      creatorIdUser: new mongoose.Types.ObjectId(req.user._id),
      title,
      description,
      location,
      participants
    })
      .then(us => res.status(200).json(us))
      .catch(error => console.log(error));
  } else {
    Lesson.create({
      creatorIdTeacher: new mongoose.Types.ObjectId(req.user._id),
      title,
      description,
      location,
      participants
    })
      .then(us => res.status(200).json(us))
      .catch(error => console.log(error));
  }
});

router.post("/createEvent", (req, res) => {
  const { title, description, geoLocation } = req.body;

  Lesson.create({
    creatorIdUser: new mongoose.Types.ObjectId(req.user._id),
    title,
    description,
    geoLocation
  })
    .then(us => res.status(200).json(us))
    .catch(error => console.log(error));
});
// Edit and Delete Lessons

router.post("/edit", (req, res) => {
  const { title, description, location, participants } = req.body;
  Lesson.findByIdAndUpdate(
    req.body.id,
    {
      title,
      description,
      location,
      participants
    },
    { new: true }
  )
    .then(theNewLesson => res.json(theNewLesson))
    .catch(err => console.log("error!!", err));
});

router.post("/editEvent", (req, res) => {
  const { title, description, geoLocation } = req.body;
  Lesson.findByIdAndUpdate(
    req.body.id,
    {
      title,
      description,
      geoLocation
    },
    { new: true }
  )
    .then(theNewLesson => res.json(theNewLesson))
    .catch(err => console.log("error!!", err));
});

router.post("/delete", (req, res) => {
  Lesson.findByIdAndDelete(req.body.id)
    .then(deleteOne => res.status(200).json(deleteOne))
    .catch(err => console.log("DB error", err));
});

module.exports = router;
