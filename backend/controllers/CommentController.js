const Comment = require("./../models/CommetModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const APIFeatures = require("./../utils/ApiFeatures");
const Feed = require("./../models/FeedModel");

exports.getAllComments = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Comment.find(), req.query)
        .filter()
        .sort()
        .limitFields()

    const filteredComments = await features.query;

    const filteredLength = filteredComments.length;

    if (req.query.APIFeatures && req.query.limit) {
        filteredComments = await features.paginate().query;
    }

    res.status(200).json({
        status: "success",
        totalLength: filteredLength,
        length: filteredComments.length,
        comments: filteredComments,
    });
});

exports.getComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
        return next(new AppError("No comment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        comment,
    });
});

exports.createComment = catchAsync(async (req, res, next) => {
    const feed = await Feed.findById(req.params.id);
    if (!feed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    

    const comment = await Comment.create(req.body);

    res.status(201).json({
        status: "success",
        comment,
    });
});

exports.updateComment = catchAsync(async (req, res, next) => {
    const updateComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updateComment) {
        return next(new AppError("No comment found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        comment: updateComment,
    });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
        return next(new AppError("No comment found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        comment: null,
    });
});