const mongoose = require("mongoose");

const FeedSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Feed must belong to a user"],
    },
    title: {
        type: String,
        required: [true, "Feed must have a title"],
    },
    description: {
        type: String,
        required: [true, "Feed must have a description"],
    },
    image: {
        type: String,
        // required: [true, "Feed must have an image"],
    },
    // comments: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: "Comment",
    //     },
    // ],
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ],
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

});

FeedSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "username profileImage",
    });
    next();
});

const Feed = mongoose.model("Feed", FeedSchema);

module.exports = Feed;
