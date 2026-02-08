const router = require("express").Router();
const asyncHandler = require("../utils/asyncHandler");
const validate = require("../middleware/validate.middleware");
const { register, login } = require("../controllers/auth.controller");
const { registerSchema, loginSchema } = require("./_schemas");

router.post("/register", validate(registerSchema), asyncHandler(register));
router.post("/login", validate(loginSchema), asyncHandler(login));

module.exports = router;
