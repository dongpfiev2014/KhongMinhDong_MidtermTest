import mongoose from "mongoose";

const AdditionalSchema = new mongoose.Schema({
  hobbies: {
    type: String,
  },
  personalGoals: {
    type: String,
  },
});

export default AdditionalSchema;
