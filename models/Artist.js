const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 80 },
    genres: [{ type: String, trim: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("Artist", artistSchema);
