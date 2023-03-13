const router = require("express").Router();

const {
  getAllComments,
  getComment,
  createComment,
  updateComment,
  deleteComment,
} = require("./../controllers/CommentController");
const { isLoggedIn, restrictTo } = require("./../controllers/AuthController");

router
  .route("/")
  .get(isLoggedIn, getAllComments)
  .post(isLoggedIn, restrictTo(["user", "publisher"]), createComment);

router
  .route("/:id")
  .get(isLoggedIn, getComment)
  .patch(isLoggedIn, restrictTo(["user", "publisher"]), updateComment)
  .delete(isLoggedIn, restrictTo(["user", "publisher"]), deleteComment);




module.exports = router;
