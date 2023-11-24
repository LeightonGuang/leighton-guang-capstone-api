const router = require("express").Router();
const favouriteController = require("../controllers/favourite-controller");

router.route("/").get(favouriteController.index);
router.route("/new-user").get(favouriteController.createUserInfo);

module.exports = router;
