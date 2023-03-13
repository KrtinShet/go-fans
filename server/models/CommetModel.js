const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
    feed: {
      type: mongoose.Schema.ObjectId,
      ref: "Feed",
      required: true,
    },
    text: {
      type: String,
      required: [true, "Please add a text"],
      maxlength: [500, "Text cannot be more than 500 characters"],
    },
    likes: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
      },
    ],
    replies: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        text: {
          type: String,
          required: [true, "Please add a text"],
          maxlength: [500, "Text cannot be more than 500 characters"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: true,
    toObject: true,
  }
);

module.exports = mongoose.model("Comment", CommentSchema);
