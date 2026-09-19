import { Auth } from "../models/auth.model.js";
import { genToken } from "../utils/genToken.js";

export const signup = async (req, res, next) => {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return res.status(200).json({
        message: "all fields are required",
      });
    }

    const isExist = await Auth.findOne({ email });

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

    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "user is not exist",
      });
    }

    const isPasswordMatched = await user.comparedPassword(password);

    if (!isPasswordMatched) {
      return res.status(409).json({
        message: "invalid password",
      });
    }

    const token = await genToken(user._id, user.email, user.username);

    return res
      .status(201)
      .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: "user signin successfull",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const user = await Auth.findOne({ _id: req.user }).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "fectchin current user failed",
      });
    }

    return res.status(200).json({
      message: "current user fetched successfully",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    message: error.message;
  }
};
