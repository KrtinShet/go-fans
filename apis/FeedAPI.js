const router = require("express").Router();

const {
  getAllFeeds,
  getFeed,
  createFeed,
  updateFeed,
  deleteFeed,
} = require("./../controllers/FeedController");
const { isLoggedIn, restrictTo } = require("./../controllers/AuthController")


router
  .route("/")
  .get(getAllFeeds)
  .post(isLoggedIn, restrictTo("publisher"), createFeed);

router
  .route("/:id")
  .get(isLoggedIn, getFeed)
  .patch(isLoggedIn, restrictTo("publisher"), updateFeed)
  .delete(isLoggedIn, restrictTo("publisher"), deleteFeed);

module.exports = router;
