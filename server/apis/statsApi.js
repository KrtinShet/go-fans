const router = require('express').Router()
const User = require("./../models/UserModel")
const Subscription = require('./../models/subscriptionModel')
const catchAsync = require("./../utils/catchAsync")


router.get("/top-5-creators", catchAsync(async (req, res) => {

    const top5Creators = await User.aggregate([
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "creator",
                as: "subscriptions"
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                profileImage: 1,
                subscribers: { $size: "$subscriptions" }
            }
        },
        {
            $sort: { subscribers: -1 }
        },
        {
            $limit: 5
        }
    ])

    res.status(200).json({
        status: "success",
        creators: top5Creators
    })
}))

router.get("/top-3-users", catchAsync(async (req, res) => {

    const top3Users = await User.aggregate([
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "user",
                as: "payments"
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                profileImage: 1,
                email: 1,
                totalPayments: { $sum: "$payments.amount" }
            }
        },
        {
            $sort: { totalPayments: -1 }
        },
        {
            $limit: 3
        }
    ])

    res.status(200).json({
        status: "success",
        users: top3Users
    })
}))

router.get("/average-payments-by-users", catchAsync(async (req, res) => {
    const avgPaymentsByUsers = await User.aggregate([
        {
            $lookup: {
                from: "payments",
                localField: "_id",
                foreignField: "user",
                as: "payments"
            }
        },
        {
            $project: {
                _id: 1,
                username: 1,
                profileImage: 1,
                email: 1,
                totalPayments: { $sum: "$payments.amount" }
            },
        },
        {
            $sort: { totalPayments: -1 }
        },
        {

        }
    ])

    res.status(200).json({
        status: "success",
        users: avgPaymentsByUsers
    })
}))


//Percentage of users who have subscribed to at least one creator:

router.get("/percentage-of-users-who-have-subscribed", catchAsync(async (req, res) => {}))
router.get("/percentage-of-users-who-have-subscribed", catchAsync(async (req, res) => {}))

module.exports = router