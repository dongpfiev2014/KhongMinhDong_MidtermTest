import bcrypt from "bcrypt";
import UsersModel from "../models/users/user.model.js";
import jwt from "jsonwebtoken";
import { JWT } from "../utils/getJsonWebToken.js";

export const signUpUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existingUser = await UsersModel.findOne({ username });
    if (existingUser) {
      throw new Error("Username existed");
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const createdUser = await UsersModel.create({
      username,
      password: hashPassword,
      role,
    });
    if (createdUser) {
      res.status(201).send({
        message: "Register successful!",
        success: true,
        data: createdUser,
        accessToken: JWT.GetJWT({
          id: createdUser.id,
          username: createdUser.username,
        }),
      });
    }
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

export const logInUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await UsersModel.findOne({ username });
    if (!existingUser) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Wrong password or username");
    }
    res.status(200).send({
      message: "Login successful!",
      success: true,
      data: existingUser,
      accessToken: JWT.GetJWT({
        id: existingUser.id,
        username: existingUser.username,
      }),
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

export const logOutUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      res.status(401).send({
        data: null,
        success: false,
        message: "Authorization failed",
      });
    } else {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
      const existingUser = await UsersModel.findById(decodedToken._id);
      if (!existingUser) {
        throw new Error("Invalid user");
      }
      console.log(existingUser);
      res.status(200).send({
        message: "Logout successful!",
        success: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
