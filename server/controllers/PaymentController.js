const APIFeatures = require('../utils/APIFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Payment = require('../models/paymentModel');

exports.createPayment = catchAsync(async (req, res, next) => {
    const payment = await Payment.create(req.body);
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