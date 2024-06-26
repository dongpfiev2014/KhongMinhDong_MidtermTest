import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const databaseUrl = `mongodb+srv://${process.env.MONGODB_Username}:${process.env.MONGODB_Password}@dongdatabase.n4hdol8.mongodb.net/`;

const connectDB = async () => {
  try {
    await mongoose.connect(databaseUrl);
    console.log("Connect to mongoDB successfully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
