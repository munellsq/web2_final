const Playlist = require("../models/Playlist");

async function createPlaylist(req, res) {
  const playlist = await Playlist.create({
    owner: req.user.id,
    name: req.body.name,
    description: req.body.description,
    songs: req.body.songs
  });

  res.status(201).json({ message: "Playlist created", playlist });
}

async function getPlaylists(req, res) {
  const playlists = await Playlist.find({ owner: req.user.id })
    .sort({ createdAt: -1 })
    .populate("songs");

  res.json(playlists);
}

async function getPlaylistById(req, res) {
  const playlist = await Playlist.findOne({ _id: req.params.id, owner: req.user.id })
    .populate("songs");

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  res.json(playlist);
}

async function updatePlaylist(req, res) {
  const playlist = await Playlist.findOneAndUpdate(
    { _id: req.params.id, owner: req.user.id },
    req.body,
    { new: true, runValidators: true }
  ).populate("songs");

  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  res.json({ message: "Playlist updated", playlist });
}

async function deletePlaylist(req, res) {
  const playlist = await Playlist.findOneAndDelete({ _id: req.params.id, owner: req.user.id });
  if (!playlist) return res.status(404).json({ message: "Playlist not found" });
  res.json({ message: "Playlist deleted" });
}

module.exports = {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist
};
