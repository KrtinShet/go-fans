const router = require("express").Router();
const { getHomePage, NotFound } = require("./../controllers/ViewController")

router.get("/", getHomePage);


router.get("*", NotFound);


module.exports = router;