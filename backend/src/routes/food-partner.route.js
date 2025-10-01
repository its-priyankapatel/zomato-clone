const express = require("express");
const Middleware = require("../middlewares/auth.middleware");
const foodPartnerController = require("../controllers/food-partner.controller");

const router = express.Router();

//     /api/food-partner/:id
router.get(
  "/:id",
  Middleware.authUserMiddleware,
  foodPartnerController.getFoodPartnerById
);

module.exports = router;
