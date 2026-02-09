const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const { searchMusic } = require("../controllers/external.controller");

router.post("/search", asyncHandler(searchMusic));

module.exports = router;
