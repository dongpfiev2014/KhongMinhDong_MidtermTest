import UsersModel from "../models/users/user.model.js";
import jwt from "jsonwebtoken";

export const verifyUserAuthentication = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(403).send({
        data: null,
        success: false,
        message: "You are not authorized to access this route",
      });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const existingUser = await UsersModel.findById(decodedToken.id);
      if (!existingUser) {
        throw new Error("Invalid user");
      }
      req.user = existingUser;
      next();
    }
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
