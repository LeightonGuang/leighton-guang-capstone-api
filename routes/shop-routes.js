const router = require("express").Router();
const shopController = require("../controllers/shop-controller");
const authenticate = require("../middleware/authenticate");

router.route("/").get(shopController.getAllShop);
router.route("/listing").get(shopController.getAllListing);
router.route("/listing").post(authenticate, shopController.addListing);
router.route("/profile").get(authenticate, shopController.profile);
router.route("/:id/listing").get(authenticate, shopController.manageListing);
router
  .route("/delete/:listing_id")
  .delete(authenticate, shopController.shopDeleteListing);
router.route("/:id").get(shopController.getListingofAShop);

module.exports = router;
