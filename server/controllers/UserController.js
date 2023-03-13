const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const catchAsync = require('../utils/catchAsync');
const APIFeature = require("./../utils/ApiFeatures")
const AppError = require('../utils/AppError');
const createJWT = require('../utils/createJWT');

exports.getMe = catchAsync(async (req, res) => {
    const { id } = req.user;
    if (!id) return res.status(400).json({ message: "Invalid user" })
    let userMe = await User.findById(id).select('-password -__v');
    if (!userMe) {
        return next(new AppError('user not found', 404));
    }
    res.status(200).json({
        status: 'success',
        user: userMe,
    });
});


exports.updateMe = catchAsync(async (req, res, next) => {
    const userMe = await User.findById(req.user.id);
    if (
        req.body.password &&
        req.body.newPassword === req.body.confirmNewPassword
    ) {
        if (userMe.checkPassword(req.body.password)) {
            userMe.password = req.body.confirmNewPassword;
            const token = createJWT(jwt, userMe.id, userMe.userType);
            res.cookie('jwt', token, {
                httpOnly: true,
                expires: new Date(
                    Date.now() + process.env.JWTCOOKIEEXPIRES * 24 * 3600 * 1000
                ),
            });
            await userMe.save();
        } else {
            return next(new AppError('password is not correct', 400));
        }
    } else if (req.file) {
        userMe.profileImage = req.file.filename;
        await userMe.save();
    } else {
        return next(new AppError('invalid information', 400));
    }
    return res.status(200).json({
        message: 'User Updated',
    });
});


exports.deleteMe = catchAsync(async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.removieCookie('jwt');
    res.status(204).json({
        status: 'success',
        data: null,
    });
});

exports.getUsers = catchAsync(async (req, res) => {
    const features = new APIFeature(User.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const users = await features.query.select('-password -__v');
    res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
            users,
        },
    });
});

exports.getUser = catchAsync(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -__v');
    res.send(user);
});
