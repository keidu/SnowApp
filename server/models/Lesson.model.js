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
    date: Date,
    participantsRef: [
      {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  {
    timestamps: true
  }
);

const Post = mongoose.model("Post", lessonSchema);
module.exports = Post;
