const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    name: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },

    songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Playlist", playlistSchema);
