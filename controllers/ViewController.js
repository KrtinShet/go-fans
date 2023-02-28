const catchAsync = require('../utils/catchAsync');

exports.getHomePage = catchAsync(async (req, res, next) => {
    res.render('home.ejs', { title: "Home", user: { name: "Krtin Shet" } })
});

exports.NotFound = catchAsync(async (req, res, next) => {
    res.render('404.ejs', { title: "404" })
});
exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.render('login.ejs', { title: "404" })
});
exports.getSignupPage = catchAsync(async (req, res, next) => {
    res.render('signup.ejs', { title: "404" })
});

exports.postLoginPage = catchAsync(async (req, res, next) => {
    console.log("post Login Page", req.body)
});

exports.postSignUpPage = catchAsync(async (req, res, next) => {
    console.log("post Sign Up Page", req.body)
});