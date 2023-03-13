const router = require("express").Router();

const {
  getLogout,
  postLogin,
  isLoggedIn,
  postSignUp,
  creatorLogin,
  creatorSignUp
} = require("./../controllers/AuthController")

router.post("/login", postLogin);
router.post("/signup", postSignUp);

router.post("/creator/login", creatorLogin);
router.post("/creator/signup", creatorSignUp);

router.get("/logout", isLoggedIn, getLogout);

router.get("/isLoggedin", isLoggedIn, (req, res) => {
  res.status(200).json({
    status: "success",
    message: "You are logged in",
    user: req.user,
  });
});

router.get("/isCreator", isLoggedIn, (req, res) => {
  if (req.user.role === "publisher") {
    res.status(200).json({
      status: "success",
      message: "You are a creator",
      user: req.user,
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "You are not a creator",
      user: req.user,
    });
  }
});

module.exports = router;
