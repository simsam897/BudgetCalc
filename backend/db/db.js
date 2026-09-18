import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDb conncted");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default db;
