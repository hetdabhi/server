import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import dotenv from "dotenv";

dotenv.config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied" });
    }

    const tokenPart = token.split(" ")[1];
    const verified = jwt.verify(tokenPart, process.env.JWT_SECRET);
    const user = await User.findById(verified.id);

    if (!user || user.token !== tokenPart) {
      return res.status(401).json({ message: "Invalid or expired token,authorizaton denied" });
    }

    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ msg:error.message});
  }
};

export default auth;