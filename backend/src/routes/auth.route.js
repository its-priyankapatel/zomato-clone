const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");

const router = express.Router();
const upload = multer({
  storage: multer.memoryStorage(),
});

//user auth APIs
router.post(
  "/user/register",
  upload.single("image"),
  authController.registerUser
);
router.post("/user/login", authController.loginUser);
router.get("/user/logout", authController.logoutUser);
router.get(
  "/get/user",
  authMiddleware.authUserMiddleware,
  authController.getUserById
);

//food partner auth APIs
router.post("/food-partner/register", authController.registerFoodPartner);
router.post("/food-partner/login", authController.loginFoodPartner);
router.get("/food-partner/logout", authController.logoutFoodPartner);

module.exports = router;
