import { Budget } from "../models/budget.model.js";

export const createBudget = async (req, res, next) => {
  try {
    const { category, amount, year, month } = req.body;
    if (!category || !amount || !year || !month);

    const isduplicatbudget = await Budget.findOne({
      user: req.user._id,
      category,
      amount,
      year,
      month,
    });

    if (isduplicatbudget) {
      return res.status(400).json({
        message: "duplicate request ! budget is already exist",
      });
    }

    const budget = await Budget.create({
      user: req.user._id,
      category,
      amount,
      year,
      month,
    });

    if (!budget) {
      return res.status(400).json({
        message: "budget creation failed",
      });
    }

    return res.status(200).json({
      message: "budget created successfully",
      budget,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllBudget = async (req, res, next) => {
  try {
    const budget = await Budget.findOne({
      user: req.user._id,
    }).populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "category",
      },
    ]);
    if (!budget) {
      return res.status(400).json({
        message: "budget no avaliable",
      });
    }

    return res.status(200).json({
      message: "budgets are fetched successfully",
      budget,
    });
  } catch (error) {
    return res.status(500).json({
      messge: error.message,
    });
  }
};

export const getBudgetById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const budget = await Budget.findOne({
      _id: id,
      user: req.user._id,
    }).populate([
      {
        path: "user",
        select: "-password",
      },
      {
        path: "category",
      },
    ]);

    if (!budget) {
      return res.status(400).json({
        message: "budget fetching failed",
      });
    }

    return res.status(200).json({
      message: "budget fetched successfully",
      budget,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
