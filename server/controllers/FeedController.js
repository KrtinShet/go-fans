const Feed = require("../models/FeedModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/AppError");
const APIFeatures = require("../utils/APIFeatures");
const Subscription = require("../models/subscriptionModel")

exports.getAllFeeds = catchAsync(async (req, res, next) => {
    let query = Feed.find();

    let features = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()

    let filteredFeeds = await features.query.clone();

    let filteredLength = filteredFeeds.length;

    if (req.query.page && req.query.limit) {
        filteredFeeds = await features.paginate().query.clone();
    }

    res.status(200).json({
        status: "success",
        totalLength: filteredLength,
        length: filteredFeeds.length,
        feeds: filteredFeeds,
    });
});

exports.getAllSubscribedFeeds = catchAsync(async (req, res, next) => {
    let subscriptions = await Subscription.find({ user: req.user._id });
    let subscribedPublishers = subscriptions.map((sub) => sub.creator._id);

    let query = Feed.find({ user: { $in: subscribedPublishers } });

    let features = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .limitFields()

    let filteredFeeds = await features.query.clone();

    let filteredLength = filteredFeeds.length;

    if (req.query.page && req.query.limit) {
        filteredFeeds = await features.paginate().query.clone();
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

    let newFeedData = {
        user: req.user,
        ...req.body,
    }
    if (req.file) {
        newFeedData.image = req.file.filename
    }
    const feed = await Feed.create(newFeedData);

    if (!feed) {
        return next(new AppError("Feed could not be created", 500));
    }
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

exports.likeFeed = catchAsync(async (req, res, next) => {
    const feed = await Feed.findById(req.params.feedId);

    if (!feed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    if (feed.likes.includes(req.user._id)) {
        return next(new AppError("You already liked this feed", 409));
    }

    feed.likes.push(req.user._id);

    await feed.save();

    res.status(200).json({
        status: "success",
        feed,
    });
});

exports.unlikeFeed = catchAsync(async (req, res, next) => {
    const feed = await Feed.findById(req.params.feedId);

    if (!feed) {
        return next(new AppError("No feed found with that ID", 404));
    }

    if (!feed.likes.includes(req.user._id)) {
        return next(new AppError("You haven't liked this feed yet", 409));
    }

    feed.likes = feed.likes.filter((id) => id != req.user._id);

    await feed.save();

    res.status(200).json({
        status: "success",
        feed,
    });
});

exports.getAllCreatorFeeds = catchAsync(async (req, res, next) => {
    const creatorId = req.params.id;
    const feeds = await Feed.find({ user: creatorId });

    if (!feeds) {
        return next(new AppError("No feeds found for this creator", 404));
    }

    res.status(200).json({
        status: "success",
        feeds,
    });
});