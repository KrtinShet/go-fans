const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const createJWT = require("./../utils/createJWT");
const User = require("./../models/UserModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");

dotenv.config();


let sendJWTResponse = (user, message, statusCode, res) => {
    const token = createJWT(jwt, user.id);
    user.password = undefined;
    user.__v = undefined;
    res.cookie("jwt", token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
        ),
    });
    res.status(statusCode).json({
        status: "success",
        message,
        user,
    });
};

exports.postLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    const user = await User.findOne({
        email,
    }).select("+password");
    if (!user || !(await user.checkPassword(password))) {
        return next(new AppError("Incorrect email or password", 401));
    }
    sendJWTResponse(user, "you are now logged in", 200, res);
});

exports.postSignUp = catchAsync(async (req, res, next) => {
    const { email, username, password, confirmPassword } = req.body;
    const user = await User.findOne({
        email,
    }).select("+password");
    if (user) {
        return next(
            new AppError("Email is already registered try with another email", 409)
        );
    }
    if (!confirmPassword || password !== confirmPassword) {
        return next(new AppError("Password confirmation does not match", 409));
    }
    const newUser = await User.create({
        username,
        email,
        password,
    });
    sendJWTResponse(newUser, "You are now signed Up", 201, res);
});


exports.creatorLogin = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new AppError("Please provide email and password", 400));
    }
    const user = await User.findOne({
        email,
    }).select("+password");
    if (!user || !(await user.checkPassword(password))) {
        return next(new AppError("Incorrect email or password", 401));
    }
    if (user.role !== "publisher") {
        return next(new AppError("You are not a creator", 401));
    }
    sendJWTResponse(user, "you are now logged in", 200, res);
});

exports.creatorSignUp = catchAsync(async (req, res, next) => {
    const { email, username, password, confirmPassword } = req.body;
    const user = await User.findOne({
        email,
    }).select("+password");
    if (user) {
        return next(
            new AppError("Email is already registered try with another email", 409)
        );
    }
    if (!confirmPassword || password !== confirmPassword) {
        return next(new AppError("Password confirmation does not match", 409));
    }
    const newUser = await User.create({
        username,
        email,
        password,
        role: "publisher",
    });
    sendJWTResponse(newUser, "You are now signed Up", 201, res);
});


exports.getLogout = (req, res, next) => {
    res.cookie("jwt", "", {
        expires: new Date(Date.now() * 0),
        httpOnly: true,
    });
    res.status(200).json({
        status: "success",
        data: "you are sucessfully logged out",
    });
};

exports.restrictTo = (...usertype) => {
    return (req, res, next) => {
        if (typeof req.user === "undefined") {
            return next(new AppError("you are not logged in", 400));
        } else if (!usertype.includes(req.user.role)) {
            console.log(req.user.role)
            console.log(usertype)
            return next(
                new AppError("you are not Authorised to perform this action", 401)
            );
        }
        next();
    };
};


exports.seralizeUser = catchAsync(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        req.user = null;
        return next();
    }
    try {
        const decoded = await jwt.verify(token, process.env.JWTSECRET);
        const user = await User.findById(decoded.uid);
        req.user = user;
        return next();
    } catch (err) {
        req.user = null;
        return next();
    }

});

exports.isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        next(new AppError("you are not logged in to perform this action", 401));
    }
};
