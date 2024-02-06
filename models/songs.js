const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const songSchema = new Schema(
  {
    title: String,
    artist: String,
    album: String,
    genre: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
