const router = require('express').Router();

const {
    createPayment,
    getAllPayments,
    getPayment,
    updatePayment,
    getAllMyPayments
} = require("./../controllers/PaymentController")

const { isLoggedIn } = require("./../controllers/AuthController")

router.use(isLoggedIn);
router.route("/").get(getAllMyPayments).post(createPayment);
router.route("/:id").get(getPayment).put(updatePayment);


module.exports = router;