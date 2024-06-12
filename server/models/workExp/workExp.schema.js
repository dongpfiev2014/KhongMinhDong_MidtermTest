import mongoose from "mongoose";

const WorkExpSchema = new mongoose.Schema({
  skills: {
    type: String,
  },
  personalProjects: [
    {
      projectName: {
        type: String,
      },
      description: {
        type: String,
      },
      role: {
        type: String,
      },
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
  ],
  workHistory: [
    {
      startDate: { type: Date },
      endDate: { type: Date },
      company: { type: String },
      role: { type: String },
    },
  ],
});

export default WorkExpSchema;
