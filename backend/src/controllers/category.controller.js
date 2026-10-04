import { Category } from "../models/category.model.js";

export const createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;

    if (!category) {
      return res.status(400).json({
        message: "category  is required",
      });
    }
    const duplicate = await Category.findOne({ category });
    if (duplicate) {
      return res.status(409).json({
        message: "this category is already exist",
      });
    }

    const data = await Category.create({ category });

    return res.status(202).json({
      message: "category created successfully",
      data: {
        _id: data._id,
        category: data.category,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const data = await Category.find();

    if (data.length === 0) {
      return res.status(404).json({
        message: "category not found",
      });
    }

    return res.status(200).json({
      data,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
