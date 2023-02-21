const router = require("express").Router();




router.use("/", (req, res) => {
    res.send("Hello World");
});

module.exports = router;