const mongoose = require("mongoose");

const songSchema = new mongoose.Schema(
  {
    source: { type: String, default: "itunes", trim: true },
    trackId: { type: Number, required: true },
    trackName: { type: String, required: true, trim: true },
    previewUrl: { type: String, default: null, trim: true },

    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
    album: { type: mongoose.Schema.Types.ObjectId, ref: "Album", default: null },
  },
  { timestamps: true }
);

songSchema.index({ source: 1, trackId: 1 }, { unique: true });

module.exports = mongoose.model("Song", songSchema);
