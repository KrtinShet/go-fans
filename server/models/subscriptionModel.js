const mongoose = require('mongoose');

const SubscriptionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true,
        expireAfterSeconds: 2592000,
        expires: 2592000,
    }
);


SubscriptionSchema.pre(/^find/, function (next) {
    this.populate({
        path: 'creator',
        select: 'username email profileImage _id'
    })
    this.populate({
        path: 'user',
        select: 'username email profileImage _id'
    })
    next();
})

module.exports = mongoose.model('Subscription', SubscriptionSchema);
