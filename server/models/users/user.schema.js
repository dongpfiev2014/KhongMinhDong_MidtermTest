import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  username: {
    required: true,
    type: String,
    unique: true,
  },
  password: {
    required: true,
    type: String,
  },
  role: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

UsersSchema.path("username").validate(function (value) {
  if (value.length < 8) {
    this.invalidate("username", "Username must be at least 8 characters.");
  }
});

export default UsersSchema;
