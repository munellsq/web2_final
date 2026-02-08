const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    name: { type: String, required: true, trim: true, maxlength: 80 },
    description: { type: String, trim: true, maxlength: 300 },
    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
