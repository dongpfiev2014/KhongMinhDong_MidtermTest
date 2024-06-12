import UsersSchema from "./user.schema.js";
import mongoose from "mongoose";
import Collections from "../../database/collection.js";

const UsersModel = mongoose.model(Collections.USERS, UsersSchema);

export default UsersModel;
