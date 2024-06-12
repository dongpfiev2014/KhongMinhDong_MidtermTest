import mongoose from "mongoose";
import Collections from "../../database/collection.js";
import AdditionalSchema from "./additional.schema.js";

const AdditionalModel = mongoose.model(Collections.PROFILES, AdditionalSchema);

export default AdditionalModel;
