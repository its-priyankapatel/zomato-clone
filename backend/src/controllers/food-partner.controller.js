const foodPartnerModel = require("../models/foodpartner.model");
const foodModel = require("../models/food.model");

async function getFoodPartnerById(req, res) {
  const { id } = req.params;
  // console.log(id);

  const foodPartner = await foodPartnerModel.findById(id);
  const foodItemByFoodPartner = await foodModel.find({ foodPartner: id });
  console.log(foodItemByFoodPartner);

  if (!foodPartner) {
    return res.status(404).json({
      message: "Food Partner not found",
    });
  }
  res.status(200).json({
    message: "Food Partner get successfully",
    foodPartner: {
      ...foodPartner.toObject(),
      foodItem: foodItemByFoodPartner,
    },
  });
}

module.exports = { getFoodPartnerById };
