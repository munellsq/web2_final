const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const {
  createPlaylist,
  getPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist
} = require("../controllers/playlists.controller");
const { createPlaylistSchema, updatePlaylistSchema } = require("./_schemas");

router.post("/", auth, validate(createPlaylistSchema), asyncHandler(createPlaylist));
router.get("/", auth, asyncHandler(getPlaylists));
router.get("/:id", auth, asyncHandler(getPlaylistById));
router.put("/:id", auth, validate(updatePlaylistSchema), asyncHandler(updatePlaylist));
router.delete("/:id", auth, asyncHandler(deletePlaylist));

module.exports = router;
