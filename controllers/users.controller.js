const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function getProfile(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json(user);
}

async function updateProfile(req, res) {
  const updates = { ...req.body };

  if (updates.password) {
    const salt = await bcrypt.genSalt(10);
    updates.password = await bcrypt.hash(updates.password, salt);
  }

  if (updates.email) {
    const exists = await User.findOne({ email: updates.email });
    if (exists && exists._id.toString() !== req.user.id) {
      return res.status(400).json({ message: "Email already in use" });
    }
  }

  const user = await User.findByIdAndUpdate(req.user.id, updates, {
    new: true,
    runValidators: true
  }).select("-password");

  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ message: "Profile updated", user });
}

module.exports = { getProfile, updateProfile };
