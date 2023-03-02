const router = require("express").Router();
const {
    getHomePage,
    NotFound,
    getLoginPage,
    getSignupPage,
    postLoginPage,
    postSignUpPage,
    getFeedPage,
    getCreatPostPage,
    postCreatPostPage
} = require("./../controllers/ViewController")


const IsViewLoggedIn = (req, res, next) => {
    console.log(req.user)
    if (req.user) {
        return next();
    }
    return res.redirect("/login");
}

const restrictTo = (...usertype) => {
    return (req, res, next) => {
        if (typeof req.user === "undefined") {
            return res.redirect("back", { error: "You are not logged in" });
        } else if (!usertype.includes(req.user.userType)) {
            return res.redirect("back", { error: "You are not logged in" });
        }
        next();
    };
};



router.get("/", getHomePage);

router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/signup").get(getSignupPage).post(postSignUpPage);

router.use(IsViewLoggedIn);

router.get("/feeds", getFeedPage);
router.get("/feeds/create", restrictTo('publisher'), getCreatPostPage);
router.post("/feeds/create", restrictTo('publisher'), postCreatPostPage);




router.get("*", NotFound);


module.exports = router;