import app from "./index.js";
import dotenv from "dotenv";
import db from "./db/db.js";

dotenv.config();

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});

db();
