const jwt = require("jsonwebtoken");
const catchAsync = require('../utils/catchAsync');
const createJWT = require("./../utils/createJWT");
const User = require("./../models/UserModel");

exports.getHomePage = catchAsync(async (req, res, next) => {
    res.render('home.ejs', { title: "Home", user: { name: "Krtin Shet" } })
});

exports.NotFound = catchAsync(async (req, res, next) => {
    res.render('404.ejs', { title: "404" })
});

exports.getLoginPage = catchAsync(async (req, res, next) => {
    res.render('login.ejs', { title: "Log In" })
});

exports.getSignupPage = catchAsync(async (req, res, next) => {
    res.render('signup.ejs', { title: "Sign Up" })
});

exports.postLoginPage = catchAsync(async (req, res, next) => {
    const { email, password } = req.body
    const user = await User.findOne({
        email,
    }).select("+password");


    if (!email || !password || !user || !(await user.checkPassword(password))) {
        return res.render('login.ejs', { title: "Log In", error: "Incorrect email or password" })
    }

    const token = createJWT(jwt, user.id);

    res.cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
        ),
    });

    res.redirect('/feeds');


});

exports.postSignUpPage = catchAsync(async (req, res, next) => {
    const { username, email, password, passwordConfirm } = req.body
    console.log({
        username,
        email,
        password,
        passwordConfirm
    })

    const user = await User.findOne({
        email,
    }).select("+password");

    if (user)
        return res.render('signup.ejs', { title: "Sign Up", error: "Email is already registered try with another email" })

    if (!passwordConfirm || password !== passwordConfirm)
        return res.render('signup.ejs', { title: "Sign Up", error: "Password confirmation does not match" })

    const newUser = await User.create({
        username,
        email,
        password,
    });

    const token = createJWT(jwt, newUser.id);

    res.cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
        ),
    });

    res.redirect('/feeds');

});

exports.getFeedPage = catchAsync(async (req, res, next) => {

})

exports.getCreatPostPage = catchAsync(async (req, res, next) => { })

exports.postCreatPostPage = catchAsync(async (req, res, next) => { })