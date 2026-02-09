const router = require("express").Router();

const auth = require("../middleware/auth.middleware");
const playlists = require("../controllers/playlists.controller");

router.post("/", auth, playlists.createPlaylist);
router.get("/", auth, playlists.getMyPlaylists);
router.get("/:id", auth, playlists.getPlaylistById);
router.put("/:id", auth, playlists.updatePlaylist);
router.delete("/:id", auth, playlists.deletePlaylist);

router.post("/:id/tracks", auth, playlists.addTrackFromExternal);
router.get("/:id/tracks", auth, playlists.getPlaylistTracks);
router.delete("/:id/tracks/:songId", auth, playlists.removeTrackFromPlaylist);

module.exports = router;
