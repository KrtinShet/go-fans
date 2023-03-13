const router = require('express').Router();

const {
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
} = require("./../controllers/SubscriptionController")

router.route("/").get(getAllSubscriptions).post(createSubscription);
router.route("/:id").get(getSubscription).put(updateSubscription);

module.exports = router;