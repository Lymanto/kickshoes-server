const router = require("express").Router();
const apiController = require("../controllers/apiController");
const { uploadSingle } = require("../multerS");

router.get("/home-page", apiController.homePage);
router.get("/detail-page/:id", apiController.detailPage);

router.post("/create", apiController.cryptoPage);
module.exports = router;
