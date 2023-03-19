const router = require("express").Router();
const path = require('path')
const {
  getAllFeeds,
  getFeed,
  createFeed,
  updateFeed,
  deleteFeed,
  getAllSubscribedFeeds,
  likeFeed,
  unlikeFeed,
  getAllCreatorFeeds
} = require("./../controllers/FeedController");
const { isLoggedIn, restrictTo } = require("./../controllers/AuthController")
const uploadImages = require('./../utils/uploadImages')


const profilePath = path.join(__dirname, '../public/images')

const uploadProfileImage = uploadImages(profilePath)


router.use(isLoggedIn);
router
  .route("/")
  .get(getAllSubscribedFeeds)
  .post(restrictTo("publisher"), uploadProfileImage.single("image"), createFeed)


router
  .route("/:id")
  .get(getFeed)
  .patch(restrictTo("publisher"), updateFeed)
  .delete(restrictTo("publisher"), deleteFeed);

router.get("/creator/:id", restrictTo('publisher'), getAllCreatorFeeds)
router.post('/like/:feedId', likeFeed)
router.post('/unlike/:feedId', unlikeFeed)

module.exports = router;
