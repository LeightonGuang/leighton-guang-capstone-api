const router = require("express").Router();
const favouriteController = require("../controllers/favourite-controller");

router.route("/").put(favouriteController.putFavourite);
router.route("/new-user").get(favouriteController.createUserInfo);
router.route("/:id").get(favouriteController.getFavourite);
module.exports = router;
