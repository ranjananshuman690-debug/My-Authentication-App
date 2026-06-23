const router = require("express").Router();
const { register, login, refresh, logout, getProfile, updateProfile } = require("../controllers/authController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);
router.get("/profile", auth, getProfile);
router.put("/profile", auth, updateProfile);

module.exports = router;
