const router = require("express").Router();
const shopController = require("../controllers/shop-controller");
const authenticate = require("../middleware/authenticate");

router.route("/").get(shopController.getAllShop);
router.route("/:id").get(shopController.getListingofAShop);
router.route("/listing").get(shopController.getAllListing);
router.route("/listing").post(shopController.addListing);
router.route("/profile").get(authenticate, shopController.profile);

module.exports = router;
