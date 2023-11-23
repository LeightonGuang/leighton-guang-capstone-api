const router = require("express").Router();
const shopController = require("../controllers/shop-controller");

router.route("/").get(shopController.getAllShop);
router.route("/:id").get(shopController.getListingofAShop);

module.exports = router;
