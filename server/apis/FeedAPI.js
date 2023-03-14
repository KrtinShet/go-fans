const router = require("express").Router();

const {
  getAllFeeds,
  getFeed,
  createFeed,
  updateFeed,
  deleteFeed,
} = require("./../controllers/FeedController");
const { isLoggedIn, restrictTo } = require("./../controllers/AuthController")

router.use(isLoggedIn);

router
  .route("/")
  .get(getAllFeeds)
  .post(restrictTo("publisher"), createFeed);

router
  .route("/:id")
  .get(getFeed)
  .patch(restrictTo("publisher"), updateFeed)
  .delete(restrictTo("publisher"), deleteFeed);

module.exports = router;
