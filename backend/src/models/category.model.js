import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    category: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);



export const Category = mongoose.model("Category" , categorySchema)