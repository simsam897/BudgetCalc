import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timeStamps: true },
);

export   const Auth = mongoose.model("Auth", authSchema);
