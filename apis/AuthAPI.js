const router = require("express").Router();

const {
  getLogout,
  postLogin,
  isLoggedIn,
  postSignUp,
} = require("./../controllers/AuthController")


router.post("/login", postLogin);
router.post("/signup", postSignUp);
router.get("/logout", isLoggedIn, getLogout);

module.exports = router;
