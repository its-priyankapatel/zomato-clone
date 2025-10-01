const foodModel = require("../models/food.model");
const { v4: uuid } = require("uuid");
const storageService = require("../services/storage.service");

async function createFood(req, res) {
  console.log(req.foodPartner);
  console.log(req.body);
  console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
  });

  res.status(201).send({
    message: "food Created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({});
  return res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

module.exports = { createFood, getFoodItems };
