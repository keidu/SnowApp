const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = Schema(
  {
    creatorIdUser: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    creatorIdTeacher: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    title: String,
    description: String,
    location: String,
    participants: Number,
    geoLocation: { type: { type: String }, coordinates: [Number] }
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", lessonSchema);
module.exports = Post;
