const router = require("express").Router();
const apiController = require("../controllers/apiController");

router.get("/home-page", apiController.homePage);
router.get("/detail-page/:id", apiController.detailPage);

module.exports = router;
