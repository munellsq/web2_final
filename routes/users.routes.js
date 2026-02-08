const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const auth = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");
const { getProfile, updateProfile } = require("../controllers/users.controller");
const { updateProfileSchema } = require("./_schemas");

router.get("/profile", auth, asyncHandler(getProfile));
router.put("/profile", auth, validate(updateProfileSchema), asyncHandler(updateProfile));

module.exports = router;
