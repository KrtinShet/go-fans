const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
        default: 10
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});

module.exports = mongoose.model('Payment', PaymentSchema);

