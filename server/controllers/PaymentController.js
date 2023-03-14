const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Payment = require('../models/paymentModel');
const Subscription = require('../models/subscriptionModel');

exports.createPayment = catchAsync(async (req, res, next) => {

    let existingSubscription = await Subscription.findOne({
        user: req.user,
        creator: req.body.creator
    })

    if (existingSubscription) {
        return next(new AppError('You already have a subscription', 404));
    }

    const payment = await Payment.create({
        user: req.user,
        ...req.body
    });

    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    }

    let newSubscription = await Subscription.create({
        user: req.user,
        ...req.body
    });

    res.status(201).json({
        status: 'success',
        payment
    });
});

exports.getAllPayments = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Payment.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate();
    const payments = await features.query;
    res.status(200).json({
        status: 'success',
        results: payments.length,
        payments
    });
});

exports.getAllMyPayments = catchAsync(async (req, res, next) => {
    let query = Payment.find({
        user: req.user._id
    })

    let features = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()


    let filteredPayments = await features.query.clone();
    let filteredLength = filteredPayments.length;

    if (req.query.page && req.query.limit) {
        filteredPayments = await features.paginate().query.clone();
    }

    res.status(200).json({
        status: 'success',
        totalLength: filteredLength,
        length: filteredPayments.length,
        payments: filteredPayments,
    });
});


exports.getPayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id);
    if (!payment) {
        return next(new AppError('No payment found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        payment
    });
});

exports.updatePayment = catchAsync(async (req, res, next) => {
});