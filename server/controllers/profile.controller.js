// import UsersModel from "../models/users/user.model.js";
import ProfilesModel from "../models/profiles/profile.model.js";
import UsersModel from "../models/users/user.model.js";

export const postProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { fullName, dateOfBirth, placeOfBirth, nationality, education } =
      req.body;
    const existingUser = req.user;
    if (username !== existingUser.username) {
      throw new Error("Username does not match with authenticated user");
    }
    const createdProfile = await ProfilesModel.create({
      fullName,
      dateOfBirth,
      placeOfBirth,
      nationality,
      education,
      userId: existingUser.id,
    });
    res.status(201).send({
      data: createdProfile,
      success: true,
      message: "Profile created successfully",
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await UsersModel.findOne({ username });
    if (!user) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "User not found",
      });
    }
    const profile = await ProfilesModel.findOne({ userId: user._id });
    if (!profile) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Profile not found",
      });
    }
    res.status(200).send({
      data: profile,
      success: true,
      message: "Profile fetched successfully",
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const { fullName, dateOfBirth, placeOfBirth, nationality, education } =
      req.body;
    const existingUser = req.user;

    if (username !== existingUser.username) {
      throw new Error("Username does not match with authenticated user");
    }
    const updatedProfile = await ProfilesModel.findOneAndUpdate(
      { userId: existingUser.id },
      { fullName, dateOfBirth, placeOfBirth, nationality, education },
      { new: true } // Return the updated document
    );
    if (!updatedProfile) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Profile not found",
      });
    }
    res.status(200).send({
      data: updatedProfile,
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const existingUser = req.user;
    if (username !== existingUser.username) {
      throw new Error("Username does not match with authenticated user");
    }
    const deletedProfile = await ProfilesModel.findOneAndDelete({
      userId: existingUser._id,
    });

    if (!deletedProfile) {
      return res.status(404).send({
        data: null,
        success: false,
        message: "Profile not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(500).send({
      data: null,
      success: false,
      message: error.message,
    });
  }
};
