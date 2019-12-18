const express = require("express");
const router = express.Router();
const Lesson = require("../models/Lesson.model");
const mongoose = require("mongoose");

// Find Lessons

router.get("/getAllLessons", (req, res) => {
  Lesson.find()
    .populate("creatorIdTeacher", "email")
    .populate("creatorIdUser", "email")
    .populate("participantsRef")
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
  const { title, description, location, participants, date } = req.body;
  console.log(req.body);

  if (req.user.role !== "Teacher") {
    Lesson.create({
      creatorIdUser: new mongoose.Types.ObjectId(req.user._id),
      title,
      description,
      location,
      participants,
      date
    })
      .then(us => res.status(200).json(us))
      .catch(error => console.log(error));
  } else {
    Lesson.create({
      creatorIdTeacher: new mongoose.Types.ObjectId(req.user._id),
      title,
      description,
      location,
      participants,
      date
    })
      .then(us => res.status(200).json(us))
      .catch(error => console.log(error));
  }
});

// Edit and Delete Lessons

router.post("/edit", (req, res) => {
  const { title, description, location, participants, date } = req.body;
  Lesson.findByIdAndUpdate(
    req.body.id,
    {
      title,
      description,
      location,
      participants,
      date
    },
    { new: true }
  )
    .then(theNewLesson => res.json(theNewLesson))
    .catch(err => console.log("error!!", err));
});

router.post("/signup", (req, res) => {
  Lesson.findByIdAndUpdate(
    req.body.id,
    {
      $addToSet: {
        participantsRef: req.user._id
      }
    },
    { new: true }
  )
    .populate("participantsRef")
    .then(theNewLesson => res.json(theNewLesson))
    .catch(err => console.log("error!!", err));
});

router.get("/updateParticipants", (req, res) => {
  Lesson.findById(req.body.id)
    .then(theLesson => res.json(theLesson))
    .catch(err => console.log("error!!", err));
});

router.post("/delete", (req, res) => {
  Lesson.findByIdAndDelete(req.body.id)
    .then(deleteOne => res.status(200).json(deleteOne))
    .catch(err => console.log("DB error", err));
});

module.exports = router;
