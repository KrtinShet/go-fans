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
    expires: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Subscription', SubscriptionSchema);
