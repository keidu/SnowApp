const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const uploader = require("../configs/cloudinary.config");

router.post("/upload", uploader.single("imgPath"), (req, res, next) => {
  const { imgPath } = req.body;
  console.log(req.body, "img upload");
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  if (req.user) {
    User.findByIdAndUpdate(req.user._id, {
      imgPath: imgPath
    }).then(user => res.json({ secure_url: req.file.secure_url }));
  } else {
    console.log(req.file.secure_url);
    res.json({ secure_url: req.file.secure_url });
  }
});
module.exports = router;
