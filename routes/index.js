const router = require("express").Router();
const { getHomePage, NotFound, getLoginPage, getSignupPage, postLoginPage, postSignUpPage, } = require("./../controllers/ViewController")

router.get("/", getHomePage);


router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/signup").get(getSignupPage).post(postSignUpPage);





router.get("*", NotFound);


module.exports = router;