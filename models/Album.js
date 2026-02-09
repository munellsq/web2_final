const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    artist: { type: mongoose.Schema.Types.ObjectId, ref: "Artist", required: true },
  },
  { timestamps: true }
);

albumSchema.index({ name: 1, artist: 1 }, { unique: true });

module.exports = mongoose.model("Album", albumSchema);
