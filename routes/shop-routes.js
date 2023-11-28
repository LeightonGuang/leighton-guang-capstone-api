const router = require("express").Router();
const shopController = require("../controllers/shop-controller");
const authenticate = require("../middleware/authenticate");

router.route("/").get(shopController.getAllShop);
router.route("/listing").get(shopController.getAllListing);
router.route("/listing").post(shopController.addListing);
router.route("/profile").get(authenticate, shopController.profile);
router.route("/:id/listing").get(authenticate, shopController.manageListing);
router.route("/:id").get(shopController.getListingofAShop);

module.exports = router;
