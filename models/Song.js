const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album" },
    durationSec: { type: Number, min: 1 },
    externalId: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Song", songSchema);
