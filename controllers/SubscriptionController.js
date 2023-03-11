const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Subscription = require('../models/subscriptionModel');
const APIFeatures = require('../utils/APIFeatures');

exports.createSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.create(req.body);
    res.status(201).json({
        status: 'success',
        subscription
    });
});

exports.getAllSubscriptions = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Subscription.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const subscriptions = await features.query;
    res.status(200).json({
        status: 'success',
        results: subscriptions.length,
        subscriptions
    });
});

exports.getSubscription = catchAsync(async (req, res, next) => {
    const subscription = await Subscription.findById(req.params.id);
    if (!subscription) {
        return next(new AppError('No subscription found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        subscription
    });
});

exports.updateSubscription = catchAsync(async (req, res, next) => {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.body.id, req.body, {
        new: true,
        runValidators: true
    });
    if (!updatedSubscription) {
        return next(new AppError('No subscription found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        subscription: updatedSubscription
    });
});
