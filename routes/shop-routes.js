const router = require("express").Router();
const shopController = require("../controllers/shop-controller");

router.route("/").get(shopController.getAllShop);

module.exports = router;
