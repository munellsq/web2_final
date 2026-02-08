const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { signToken } = require("../utils/jwt");

async function register(req, res) {
  const { username, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ message: "Email already in use" });

  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(password, salt);

  const user = await User.create({ username, email, password: hashed });

  const token = signToken({ id: user._id.toString(), email: user.email });

  res.status(201).json({
    message: "Registered successfully",
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: "Invalid credentials" });

  const token = signToken({ id: user._id.toString(), email: user.email });

  res.json({
    message: "Logged in successfully",
    token,
    user: { id: user._id, username: user.username, email: user.email }
  });
}

module.exports = { register, login };
