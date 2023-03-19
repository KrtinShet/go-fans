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
  .get(getAllComments)
  .post(restrictTo("user", "publisher"), createComment);

router
  .route("/:id")
  .get(getComment)
  .patch(restrictTo("user", "publisher"), updateComment)
  .delete(restrictTo("user", "publisher"), deleteComment);




module.exports = router;
