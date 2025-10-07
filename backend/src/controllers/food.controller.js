const foodModel = require("../models/food.model");
const { v4: uuid } = require("uuid");
const storageService = require("../services/storage.service");
const likeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");

async function createFood(req, res) {
  // console.log(req.foodPartner);
  console.log(req.body);
  // console.log(req.file);

  const fileUploadResult = await storageService.uploadFile(
    req.file.buffer,
    uuid()
  );
  // console.log(fileUploadResult);

  const foodItem = await foodModel.create({
    name: req.body.name,
    description: req.body.description,
    video: fileUploadResult.url,
    foodPartner: req.foodPartner._id,
    // user: req.user?._id,
  });

  res.status(201).send({
    message: "food Created successfully",
    food: foodItem,
  });
}

async function getFoodItems(req, res) {
  const foodItems = await foodModel.find({}).populate("user");
  return res.status(200).json({
    message: "Food items fetched successfully",
    foodItems,
  });
}

async function likeFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const isAlreadyLiked = await likeModel.findOne({
    user: user._id,
    food: foodId,
  });
  if (isAlreadyLiked) {
    await likeModel.deleteOne({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: -1 },
    });

    return res.status(200).json({
      message: "Food unliked successfully",
    });
  } else {
    const like = await likeModel.create({
      user: user._id,
      food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 },
    });

    res.status(201).json({
      message: "Food liked successfully",
      like,
    });
  }
}

async function saveFood(req, res) {
  const { foodId } = req.body;
  const user = req.user;

  const save = await saveModel.findOne({
    food: foodId,
    user: user._id,
  });

  if (save) {
    // unsave
    await saveModel.deleteOne({ user: user._id, food: foodId });

    return res.status(200).json({
      success: false, // unsaved
      saveStatus: 0, // 0 = unsaved
    });
  } else {
    // save
    await saveModel.create({ user: user._id, food: foodId });

    return res.status(201).json({
      success: true, // saved
      saveStatus: 1, // 1 = saved
    });
  }
}

const getSavedVideo = async (req, res) => {
  const saves = await saveModel.find({ user: req.user._id }).populate("food");
  if (!saves) {
    return res.status(400).json({
      success: false,
      message: "There is no data saved",
    });
  }
  const savedFood = saves.map((s) => s.food);
  res.status(200).json({
    success: true,
    message: "Get saved videos",
    savedFood,
  });
};

const deleteSavedVideo = async (req, res) => {
  const foodId = req.params.id;
  const userId = req.user._id;

  const isFoodExist = await saveModel.findOneAndDelete({
    user: userId,
    food: foodId,
  });
  if (!isFoodExist) {
    return res.status(404).send({
      success: false,
      message: "Saved video not found for the user",
    });
  }
  return res.status(200).send({
    success: true,
    message: "food unsaved successfully",
  });
};

module.exports = {
  createFood,
  getFoodItems,
  likeFood,
  saveFood,
  getSavedVideo,
  deleteSavedVideo,
};
