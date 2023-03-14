const router = require("express").Router();

const {
  getAllFeeds,
  getFeed,
  createFeed,
  updateFeed,
  deleteFeed,
  getAllSubscribedFeeds,
} = require("./../controllers/FeedController");
const { isLoggedIn, restrictTo } = require("./../controllers/AuthController")



router.use(isLoggedIn);
router
  .route("/")
  .get(getAllSubscribedFeeds)
  .post(restrictTo("publisher"), createFeed);

router
  .route("/:id")
  .get(getFeed)
  .patch(restrictTo("publisher"), updateFeed)
  .delete(restrictTo("publisher"), deleteFeed);

module.exports = router;
