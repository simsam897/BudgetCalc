import { Auth } from "../models/auth.model.js";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(200).json({
        message: "all fields are required",
      });
    }

    const isExist = await Auth.find({ email });

    if (isExist) {
      return res.status(200).json({
        message: "user already exist",
      });
    }

    const user = await Auth.create({ email, username, password });

    return res.status(200).json({
      message: "user signup successfull",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(404).json({
        message: "all fields are requird",
      });
    }

    const isExist = await Auth.findOne({ email });

    if (!isExist) {
      return res.status(404).json({
        message: "user is not exist",
      });
    }

    const user = await Auth.findOne({ email, password });

    return res.status(200).json({
      message: "user signin successfull",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
