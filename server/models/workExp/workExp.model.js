import mongoose from "mongoose";
import Collections from "../../database/collection.js";
import WorkExpSchema from "./workExp.schema.js";

const WorkModel = mongoose.model(Collections.WORKEXP, WorkExpSchema);

export default WorkModel;
