import jwt from "jsonwebtoken";

export const genToken = (email, username, id) => {
  return jwt.sign(
    {
      email,
      username,
      id,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
};
