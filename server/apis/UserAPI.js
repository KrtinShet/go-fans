const router = require("express").Router();

const {
  deleteMe,
  getMe,
  getUser,
  getUsers,
} = require("./../controllers/UserController");


router.get("/me", getMe);
router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/me", deleteMe);


module.exports = router;
