import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import authRouter from "./routers/auth.router.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/v1/auth", authRouter);

connectDB().then(() => {
  app.listen(process.env.SERVER_PORT, (err) => {
    if (err) throw new Error();
    console.log(
      `Server is running on ${process.env.SERVER_URL}:${process.env.SERVER_PORT}`
    );
  });
});
