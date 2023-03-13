const router = require('express').Router();

const {
    createPayment,
    getAllPayments,
    getPayment,
    updatePayment,
} = require("./../controllers/PaymentController")


router.route("/").get(getAllPayments).post(createPayment);
router.route("/:id").get(getPayment).put(updatePayment);


module.exports = router;