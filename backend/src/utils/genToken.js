import jwt from "jsonwebtoken";

export const genToken = (id, email, username) => {
  return jwt.sign(
    {
      id,
      email,
      username,
    },
    process.env.SECRET_KEY,
    {
      expiresIn: "1d",
    },
  );
};
