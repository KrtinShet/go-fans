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
    if (req.user) {
        next();
    }
    return res.redirect("/login");
}

const restrictTo = (...usertype) => {
    return (req, res, next) => {
        if (typeof req.user === "undefined") {
            return next(new AppError("you are not logged in", 400));
        } else if (!usertype.includes(req.user.userType)) {
            return next(
                new AppError("you are Authorised to perform this action", 401)
            );
        }
        next();
    };
};



router.get("/", getHomePage);

router.route("/login").get(getLoginPage).post(postLoginPage);
router.route("/signup").get(getSignupPage).post(postSignUpPage);

router.use(IsViewLoggedIn);

router.get("/feeds", IsViewLoggedIn, getFeedPage);
router.get("/feeds/create", restrictTo('publisher'), getCreatPostPage);
router.post("/feeds/create", restrictTo('publisher'), postCreatPostPage);




router.get("*", NotFound);


module.exports = router;