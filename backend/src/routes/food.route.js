const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const foodController = require("../controllers/food.controller");
const router = express.Router();
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
});

// POST / api / food / [protected]
router.post(
  "/",
  authMiddleware.authFoodPartnerMiddleware,
  upload.single("file"),
  foodController.createFood
);

// GET/api/food/ [protected]
router.get("/", authMiddleware.authUserMiddleware, foodController.getFoodItems);

router.post(
  "/like",
  authMiddleware.authUserMiddleware,
  foodController.likeFood
);

router.post(
  "/save",
  authMiddleware.authUserMiddleware,
  foodController.saveFood
);

router.get(
  "/get/saved-video",
  authMiddleware.authUserMiddleware,
  foodController.getSavedVideo
);

router.delete(
  "/delete-saved/:id",
  authMiddleware.authUserMiddleware,
  foodController.deleteSavedVideo
);

module.exports = router;
