const router = require('express').Router();

const {
    createSubscription,
    getAllSubscriptions,
    getSubscription,
    updateSubscription,
    testSubscriptionQueries,
    getAllMySubscriptions
} = require("./../controllers/SubscriptionController")
const { isLoggedIn } = require("./../controllers/AuthController")

router.use(isLoggedIn);
router.route("/").get(getAllMySubscriptions).post(createSubscription);
router.get("/s/", getAllSubscriptions)
router.route("/:id").get(getSubscription).put(updateSubscription);

module.exports = router;