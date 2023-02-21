const Feed = require("./../models/FeedModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/AppError");
const APIFeatures = require("./../utils/ApiFeatures");

exports.getAllFeeds = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Feed.find(), req.query)
        .filter()
        .sort()
        .limitFields()

    const filteredFeeds = await features.query;

    const filteredLength = filteredFeeds.length;

    if (req.query.APIFeatures && req.query.limit) {
        filteredFeeds = await features.paginate().query;
    }

    res.status(200).json({
        status: "success",
        totalLength: filteredLength,
        length: filteredFeeds.length,
        feeds: filteredFeeds,
    });
});

exports.getFeed = catchAsync(async (req, res, next) => {
    const feed = await Feed.findById(req.params.id);

    if (!feed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        feed,
    });
});

exports.createFeed = catchAsync(async (req, res, next) => {
    const feed = await Feed.create(req.body);

    res.status(201).json({
        status: "success",
        feed,
    });
});

exports.updateFeed = catchAsync(async (req, res, next) => {
    const updateFeed = await Feed.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    if (!updateFeed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    res.status(200).json({
        status: "success",
        feed: updateFeed,
    });
});

exports.deleteFeed = catchAsync(async (req, res, next) => {
    const feed = await Feed.findByIdAndDelete(req.params.id);

    if (!feed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    res.status(204).json({
        status: "success",
        data: null,
    });
});