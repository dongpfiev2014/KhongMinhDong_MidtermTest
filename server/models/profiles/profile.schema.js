import mongoose from "mongoose";

const ProfilesSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
  },
  placeOfBirth: {
    type: String,
  },
  nationality: {
    type: String,
  },
  education: {
    type: String,
  },
});

export default ProfilesSchema;
