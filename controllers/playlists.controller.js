const Playlist = require("../models/Playlist");
const Song = require("../models/Song");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

// пытаемся достать userId максимально устойчиво
function getUserId(req) {
  return req.user?.id || req.user?._id || req.user?.userId;
}

// ====== CRUD Playlists ======

exports.createPlaylist = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { name, description = "" } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "name is required" });
    }

    const playlist = await Playlist.create({
      user: userId,
      name: name.trim(),
      description: description?.trim?.() || "",
      songs: [],
    });

    res.status(201).json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.getMyPlaylists = async (req, res, next) => {
  try {
    const userId = getUserId(req);

    const playlists = await Playlist.find({ user: userId })
      .sort({ createdAt: -1 });

    res.json(playlists);
  } catch (err) {
    next(err);
  }
};

exports.getPlaylistById = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const playlist = await Playlist.findOne({ _id: id, user: userId })
      .populate({
        path: "songs",
        populate: [{ path: "artist" }, { path: "album" }],
      });

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;
    const { name, description } = req.body;

    const update = {};
    if (typeof name === "string") update.name = name.trim();
    if (typeof description === "string") update.description = description.trim();

    const playlist = await Playlist.findOneAndUpdate(
      { _id: id, user: userId },
      update,
      { new: true }
    );

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json(playlist);
  } catch (err) {
    next(err);
  }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { id } = req.params;

    const playlist = await Playlist.findOneAndDelete({ _id: id, user: userId });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json({ message: "Playlist deleted" });
  } catch (err) {
    next(err);
  }
};

// ====== Variant 1: import track + add to playlist ======

exports.addTrackFromExternal = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const playlistId = req.params.id;

    const {
      source = "itunes",
      trackId,
      trackName,
      artistName,
      collectionName,
      previewUrl,
    } = req.body;

    if (!trackId || !trackName || !artistName) {
      return res.status(400).json({
        message: "trackId, trackName, artistName are required",
      });
    }

    // 1) плейлист должен принадлежать юзеру
    const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    // 2) upsert artist
    const aName = String(artistName).trim();
    const artist = await Artist.findOneAndUpdate(
      { name: aName },
      { name: aName },
      { new: true, upsert: true }
    );

    // 3) upsert album (если есть)
    let album = null;
    if (collectionName && String(collectionName).trim()) {
      const alName = String(collectionName).trim();
      album = await Album.findOneAndUpdate(
        { name: alName, artist: artist._id },
        { name: alName, artist: artist._id },
        { new: true, upsert: true }
      );
    }

    // 4) upsert song (по source+trackId)
    let song;
    try {
      song = await Song.findOneAndUpdate(
        { source, trackId: Number(trackId) },
        {
          source,
          trackId: Number(trackId),
          trackName: String(trackName).trim(),
          previewUrl: previewUrl ? String(previewUrl).trim() : null,
          artist: artist._id,
          album: album ? album._id : null,
        },
        { new: true, upsert: true }
      );
    } catch (e) {
      // если словили unique conflict — просто найдём существующий
      if (e.code === 11000) {
        song = await Song.findOne({ source, trackId: Number(trackId) });
      } else {
        throw e;
      }
    }

    // 5) добавить song в playlist без дублей
    const exists = (playlist.songs || []).some(
      (s) => String(s) === String(song._id)
    );
    if (!exists) {
      playlist.songs = playlist.songs || [];
      playlist.songs.push(song._id);
      await playlist.save();
    }

    const populated = await Playlist.findById(playlist._id).populate({
      path: "songs",
      populate: [{ path: "artist" }, { path: "album" }],
    });

    return res.status(200).json({
      message: exists ? "Track already in playlist" : "Track added to playlist",
      playlist: populated,
      song,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPlaylistTracks = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const playlistId = req.params.id;

    const playlist = await Playlist.findOne({ _id: playlistId, user: userId })
      .populate({
        path: "songs",
        populate: [{ path: "artist" }, { path: "album" }],
      });

    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json({
      playlistId: playlist._id,
      name: playlist.name,
      count: playlist.songs.length,
      songs: playlist.songs,
    });
  } catch (err) {
    next(err);
  }
};

exports.removeTrackFromPlaylist = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const playlistId = req.params.id;
    const { songId } = req.params;

    const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    const before = playlist.songs.length;
    playlist.songs = (playlist.songs || []).filter(
      (s) => String(s) !== String(songId)
    );
    const after = playlist.songs.length;

    await playlist.save();

    res.json({
      message: before === after ? "Song was not in playlist" : "Song removed",
    });
  } catch (err) {
    next(err);
  }
};
