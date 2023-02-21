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
  .get(isLoggedIn, getAllFeeds)
  .post(isLoggedIn, restrictTo("publisher"), createFeed);

router
  .route("/:id")
  .get(isLoggedIn, getFeed)
  .patch(isLoggedIn, restrictTo("user"), updateFeed)
  .delete(isLoggedIn, restrictTo("user"), deleteFeed);

module.exports = router;
